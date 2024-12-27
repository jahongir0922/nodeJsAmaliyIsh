TELEGRAM_BOT_TOKEN = "794843263:AAGOhya_pVUzSLkocU1ZE3ZW8-k__kgiFmM";
const TeleBot = require("telebot");
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const chatIds = [];

const CronJob = require("cron").CronJob;
const job = new CronJob(
  "0/5 * * * * *",
  function () {
    console.log("You will see this message every second");
    chatIds.forEach((chatId) => {
      bot.sendMessage(chatId, "Salom");
    });
  },
  null,
  true
);
bot.on("text", (msg) => msg.reply.text("kelgan xabar: " + msg.text));

bot.on(["/start"], (msg) => {
  let chatId = msg.chat.id;
  if (!chatIds.includes(chatId)) {
    chatIds.push(chatId);
    msg.reply.text("Boshladik!");
    job.start();
  }
});
bot.on(["/stop"], (msg) => {
  let chatId = msg.chat.id;
  chatIds.pop(chatId);
});

bot.start();
