const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    res.send("Welcome to backend!");
  } catch (err) {
    res.status(500).send("Server error welcome!");
  }
});
module.exports = router;