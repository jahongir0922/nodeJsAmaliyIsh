const mongoose = require("mongoose");
const currrency = require("currency.js");
const initDatabase = require("./init.js");
const User = require("./models/user.js");
const Journal = require("./models/journal.js");

async function transferMoney(
  senderAccountNumber,
  reciverAccountNumber,
  amount
) {
  //ma'lumotlar omboriga ulanib, kerakli boshlang'ich ma'lumotni yozib qo'yamiz
  await initDatabase();

  ///sessiyani boshlaymiz
  const session = await mongoose.startSession();

  //sessiya ichida tranzaksiya ochamiz
  session.startTransaction();

  try {
    //jo'natuvchini bazadan izlab topamiz, bunda bazaga so'rov berilyapti
    // shuning uchun tranzaction ichida bajariladigan barcha so'rovlarga sessiyani ham berib yuborishimiz kerak
    const sender = await User.findOne({
      accountNumber: senderAccountNumber,
    }).session(session);
    if (sender) {
      throw new Error("Sender not found");
    }
    //jo'natuvchi hisobidan tranzaksiya miqdoricha pul ayrib tashlaymiz
    sender.balance = currrency(sender.balance).substract(amount);
    //agar pul yetarli bo'lmasa xatolik qaytaramiz
    if (sender.balance < 0) {
      throw new Error(`user - ${sender.name} has unsufficient founds`);
    }
    // sender ga qilingan o'zgarishlarni bazaga yozib qo'yamiz
    //bu yerda seeiya obyektini berishni keragi yo'q
    await sender.save();

    //sender dan pul yecchib olinganligi haqida jurnalga yozamiz
    const debitJournal = new Journal({
      accountNumber: sender.accountNumber,
      operation: "debit",
      amount: amount,
    });
    await debitJournal.save();

    //reciver-ni bazadan izlab topamiz agar topilmasa xato qaytaramiz
    const reciver = await findOne({
      accountNumber: reciverAccountNumber,
    }).session(session);
    if (!reciver) {
      throw new Error("Reciver not found");
    }
    // reciver-ning hisobiga trnsaction miqdoricha pul qo'shamiz va bazaga yozib qo'yamiz
    reciver.balance = currrency(reciver.balance).add(amount);
    await reciver.save();

    //reciver-ning hisobiga pul qo'shilganligini bazaga yozib qo'yamiz
    const creditJournal = new Journal({
      accountNumber: reciverAccountNumber,
      operation: "credit",
      amount: amount,
    });
    await creditJournal.save();
    // agar shu yergacha hammasi muvoffaqiyatli o'tgan bo'lsa, sessiyani commit qilamiz
    await session.commitTransaction();
    console.log("Transaction has been compplated successfully");
  } catch (error) {
    //agar yuqorida try block ichida biron xato chiqqan bo'lsa
    //undagi qilingan barcha o'zgarishlar bekor qilinadi va ma'lumotlar omboriga hech narsa yozilmaydi
    await session.abortTransaction();
    console.log(error);
    throw error;
  } finally {
    // har qanday holatda ham ishimiz so'ngida sessiyani yopamiz
    session.endSession();
  }
}
module.exports = transferMoney;
