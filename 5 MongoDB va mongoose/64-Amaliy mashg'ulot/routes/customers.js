const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 20 },
  isVip: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 5, maxlength: 20 },
});
const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  let customers = await Customer.find().sort("name");
  res.send(customers);
});
router.post("/", async (req, res) => {
  try {
    const { error } = validateCustomer(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let customer = new Customer({
      name: req.body.name,
      isVip: req.body.isVip,
      phone: req.body.phone,
    });
    customer = await customer.save();
    res.status(201).send(customer);
  } catch (err) {
    console.log(err);
    res.status(404).send("validation error");
  }
});
router.get("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(404).send("berilgan idga teng bo'lgan klient topilmadi");
  }
  res.send(customer);
});
router.put("/:id", async (req, res) => {
  // if (!customer) {
  //   return res.status(404).send("berilgan idga teng bo'lgan klient topilmadi");
  // }
  const { error } = validateCustomer(req.body);
  console.log(req.body);
  let customer = await Customer.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone,
      },
    }
  );
  // customer = await customer.save();
  res.send(customer);
});
function validateCustomer(customer) {
  const customerSchema = {
    name: Joi.string().required().min(5).max(20),
    isVip: Joi.boolean(),
    phone: Joi.string().required().min(5).max(20),
  };
  return Joi.validate(customer, customerSchema);
}
module.exports = router;
