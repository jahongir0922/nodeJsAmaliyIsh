const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  from: String,
  to: String,
  name: { type: String, required: true, minlength: 5, maxlength: 20 },
});
const Category = mongoose.model("Category", categorySchema);
function validateCategory(category) {
  const categorySchema = {
    name: Joi.string().required().min(5).max(20),
  };
  return Joi.validate(category, categorySchema);
}
exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;
