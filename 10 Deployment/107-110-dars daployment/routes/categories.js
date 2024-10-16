const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
router.get("/", async (req, res) => {
  let categories = await Category.find().sort("name");
  res.send(categories);
});
router.post("/", auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let category = new Category({
      name: req.body.name,
    });
    category = await category.save();
    res.status(201).send(category);
  } catch (err) {
    console.log(err);
    res.status(404).send("validation error");
  }
});
router.get("/:id", async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).send("berilgan idga teng bo'lgan kitob topilmadi");
  }
  res.send(category);
});
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let haveCategory = await Category.findById(req.params.id);
  if (!haveCategory) {
    return res.status(404).send("berilgan idga teng bo'lgan kitob topilmadi");
  } else {
    let category = await Category.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
        },
      }
    );
    res.send(category);
  }
});
router.delete("/:id", [auth, admin], async (req, res) => {
  let haveCategory = await Category.findById(req.params.id);
  if (!haveCategory) {
    return res.status(404).send("berilgan idga teng bo'lgan kitob topilmadi");
  } else {
    const category = await Category.deleteOne({ _id: req.params.id });
    res.send(category);
  }
});
module.exports = router;
