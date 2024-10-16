const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Joi = require("@hapi/joi");
const { User } = require("../models/user");
const _ = require("lodash");

router.get("/", async (req, res) => {
  let users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email or password is wrong!");
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(400).send("Email or password is wrong!");
  }
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(true);
});
function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  };
  return Joi.validate(req, schema);
}
module.exports = router;
