const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 20 },
  category: { type: categorySchema },
  trainer: { type: String, minlength: 5, maxlength: 20 },
  tags: { type: [String], required: true, minlength: 1, maxlength: 10 },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true,
  },
});
const Course = mongoose.model("Course", courseSchema);
function validateCustomer(course) {
  const courseSchema = {
    title: Joi.string().min(5).max(20).required(),
    categoryId: Joi.string(),
    trainer: Joi.string().min(5).max(20),
    tags: Joi.array().items(Joi.string()).required(),
    status: Joi.string().required(),
  };
  return Joi.validate(course, courseSchema);
}
exports.Course = Course;
// exports.courseSchema = courseSchema;
exports.validate = validateCustomer;
