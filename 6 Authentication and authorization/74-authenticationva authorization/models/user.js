const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    unique: true,
    minLength: 5,
    maxLength: 255,
    required: true,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 1024,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const userSchema = {
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(20).required(),
  };
  return Joi.validate(user, userSchema);
}
exports.User = User;
exports.validate = validateUser;
