const os = require("os");
const freeMem = os.freemem();
const userInfo = os.userInfo();
const totalMem = os.totalmem();
console.log(`bo'sh xotira miqdori ${freeMem / (1024 * 1024)} mb`);
console.log(`Foydalanuvchi haqida ma'lumot: ${userInfo.username}`);
console.log(`jami xotira miqdori ${totalMem / (1024 * 1024)} mb`);
const bandXotira = totalMem - freeMem;
console.log(`band xotira ` + bandXotira / (1024 * 1024) + "mb");
