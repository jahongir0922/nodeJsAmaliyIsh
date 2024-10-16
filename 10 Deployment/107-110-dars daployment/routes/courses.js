const express = require("express");
const router = express.Router();
const { Course, validate } = require("../models/course");
const { Category } = require("../models/category");
router.get("/", async (req, res) => {
  let courses = await Course.find().sort("title");
  res.send(courses);
});
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send("Category not found");
    let course = new Course({
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      trainer: req.body.trainer,
      tags: req.body.tags,
      status: req.body.status,
    });
    course = await course.save();
    res.status(201).send(course);
  } catch (err) {
    console.log(err);
    return res.status(404).send("validation error");
  }
});
module.exports = router;
