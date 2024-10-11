const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");
router.get("/", async (req, res) => {
  let customers = await Customer.find().sort("name");
  res.send(customers);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
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
});
router.get("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res.status(404).send("berilgan idga teng bo'lgan klient topilmadi");
  }
  res.send(customer);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
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
  res.send(customer);
});

module.exports = router;
