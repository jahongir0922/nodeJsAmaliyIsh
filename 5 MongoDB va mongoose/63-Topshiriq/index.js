const express = require("express");
const categories = require("./routes/categories");
const app = express();
app.use(express.json());

let cors = require("cors");

app.use(cors());
app.options("*", cors());

// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/test")
  .then(() => {
    console.log("mongoDBga ulandi");
  })
  .catch(() => {
    console.log("MongoDbga ulanishda xatolik");
  });
app.use("/api/categories", categories);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`I have been listened port number of ${port}...`);
});
