const mongoose = require("mongoose");
module.exports = function () {
  mongoose
    // .connect("mongodb://localhost/test")
    .connect(
      "mongodb+srv://qodirovjahongir09:mongo09@cluster0.rhjof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("mongoDBga ulandi");
    })
    .catch(() => {
      console.log("MongoDbga ulanishda xatolik");
    });
};
