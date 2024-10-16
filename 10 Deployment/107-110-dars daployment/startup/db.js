const mongoose = require("mongoose");
module.exports = function () {
  mongoose
    .connect("mongodb://localhost/test")
    .then(() => {
      console.log("mongoDBga ulandi");
    })
    .catch(() => {
      console.log("MongoDbga ulanishda xatolik");
    });
};
