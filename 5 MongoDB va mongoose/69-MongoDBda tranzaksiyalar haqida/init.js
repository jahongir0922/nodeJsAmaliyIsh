const mongoose = require("mongoose");
const User = require("./models/user.js");

const connString = "mongodb://localhost:27017/trans";
async function initDatabase() {
  // bazaga ulanish
  await mongoose.connect(connString, {
    replicaSet: "rs",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const senderAccountNumber = "SA1002001";
  const reciverAccountNumber = "SA3104215";

  //   jo'natuvchini hisob raqami bo'yicha bazadan izlab ko'ramiz
  const sender = await User.findOne({ accountNumber: senderAccountNumber });
  // agar topilmasa bazaga yangi sender qo'shamiz
  if (!sender) {
    const sender = new User({
      accountNumber: senderAccountNumber,
      name: "Ahmad",
      balance: 50000.0,
    });
    await sender.save();
  }
  //   oluvchini hisob raqami bo'yicha bazadan izlab ko'ramiz
  const reciver = await User.findOne({ accountNumber: reciverAccountNumber });
  // agar topilmasa bazaga yangi oluvchi qo'shamiz
  if (!reciver) {
    const reciver = new User({
      accountNumber: reciverAccountNumber,
      name: "Anvar",
      balance: 1200.0,
    });
    await reciver.save();
  }
}
// initDatabase funksiyasini modulimizda export qilamiz
module.exports = initDatabase;
