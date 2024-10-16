const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const enrolmentSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
      },
    }),
    required: true,
  },
  course: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
      },
    }),
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
    dafault: Date.now(),
  },
  courseFee: { type: Number, min: 0, required: true },
});
const Enrolment = mongoose.model("Enrolment", enrolmentSchema);
function validateEnrolment(enrolment) {
  const enrolmentSchema = {
    customerId: Joi.string().required(),
    courseId: Joi.string().required(),
    courseFee: Joi.number().min(0).required(),
    dateStart: Joi.date().required(),
  };
  return Joi.validate(enrolment, enrolmentSchema);
}
exports.Enrolment = Enrolment;
// exports.enrolmentSchema = enrolmentSchema;
exports.validate = validateEnrolment;
