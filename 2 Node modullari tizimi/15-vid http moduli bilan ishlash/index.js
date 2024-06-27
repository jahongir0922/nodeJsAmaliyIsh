const http=require('http');
const server=http.createServer();
server.on("connection", (socket)=>{
    console.log("Yangi bog\'lanish...");
})
server.listen(8000);
console.log(`${server.address().port} portni eshirtishni boshladim`);
// 
//
//
// dasturni ishga tushurib yangi terminal ochib
// telnet localhost 8000 buyrug'ini kiritamiz 
// va consolda yangi bo'glanish degan yozuv chiqadi