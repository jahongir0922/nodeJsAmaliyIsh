const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validate } = require("../models/user");
const _ = require("lodash");
const auth = require("../middleware/auth");
router.get("/me", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send("Server error me");
  }
});
router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("Email already exists");
  }
  const salt = await bcrypt.genSalt();
  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: pwdHash,
  // }); ///bu eski usul
  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"])); // pick only necessary fields from req.body to save in database
  user.password = await bcrypt.hash(req.body.password, salt); // save hashed password instead of plain text password in database

  user = await user.save();
  // res.status(201).send(user); ///bu eski usul
  res.status(201).send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});
module.exports = router;
