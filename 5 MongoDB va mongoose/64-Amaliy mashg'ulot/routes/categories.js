const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  from: String,
  to: String,
  name: { type: String, required: true, minlength: 5, maxlength: 10 },
});
const Category = mongoose.model("Category", categorySchema);

router.get("/", async (req, res) => {
  let categories = await Category.find().sort("name");
  res.send(categories);
});
router.post("/", async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
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
router.put("/:id", async (req, res) => {
  const { error } = validateCategory(req.body);
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
router.delete("/:id", async (req, res) => {
  let haveCategory = await Category.findById(req.params.id);
  if (!haveCategory) {
    return res.status(404).send("berilgan idga teng bo'lgan kitob topilmadi");
  } else {
    const category = await Category.deleteOne({ _id: req.params.id });
    res.send(category);
  }
});

function validateCategory(category) {
  const categorySchema = {
    name: Joi.string().required().min(3),
  };
  return Joi.validate(category, categorySchema);
}

// async function createCategory() {
//   const book = new Category({
//     from: "Margilon",
//     to: "Piterburg",
//     name: "Node.js",
//     author: "Qodirov Jahongir validate trim",
//     tags: ["Node.js", "Backend", "Mongoose"],
//     isPublished: true,
//     price: 250.5,
//     category: " Classic",
//   });
//   try {
//     const savedBook = await book.save();
//     console.log(savedBook);
//   } catch (ex) {
//     console.log(ex);
//   }
// }
// createCategory();
module.exports = router;
