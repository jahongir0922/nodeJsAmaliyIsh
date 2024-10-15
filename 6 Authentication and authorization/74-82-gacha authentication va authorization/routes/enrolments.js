const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Enrolment, validate } = require("../models/enrolment");
const { Course } = require("../models/course");
const { Customer } = require("../models/customer");
router.get("/", async (req, res) => {
  let courses = await Enrolment.find().sort("-dateStart");
  res.send(courses);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (
    mongoose.Types.ObjectId.isValid(req.body.customerId) &&
    mongoose.Types.ObjectId.isValid(req.body.courseId)
  ) {
    const customer = await Customer.findById(req.body.customerId);
    const course = await Course.findById(req.body.courseId);
    if (!customer) return res.status(400).send("Customer not found");
    if (!course) return res.status(400).send("Course not found");
    let enrolment = new Enrolment({
      customer: {
        _id: customer._id,
        name: customer.name,
      },
      course: {
        _id: course._id,
        title: course.title,
      },
      courseFee: req.body.courseFee,
      dateStart: req.body.dateStart,
    });
    enrolment = await enrolment.save();
    res.status(201).send(enrolment);
  } else return res.status(400).send("Objct id is not valid");
});
module.exports = router;
