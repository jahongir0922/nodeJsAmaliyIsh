const express = require("express");
const categoriesRoute = require("./routes/categories");
const customersRoute = require("./routes/customers");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost/test")
  .then(() => {
    console.log("mongoDBga ulandi");
  })
  .catch(() => {
    console.log("MongoDbga ulanishda xatolik");
  });

app.use(express.json());
app.use("/api/categories", categoriesRoute);
app.use("/api/customers", customersRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`I have been listened port number of ${port}...`);
});
