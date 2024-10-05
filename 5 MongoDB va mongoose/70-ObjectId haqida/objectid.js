const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId(); ///bu yerda id create qilinyapti
// console.log(id);
// console.log(id.getTimestamp());      ///bu yerda id ni qachon yaratilgani olinyapti 
console.log(mongoose.Types.ObjectId.isValid("66f68b97f73e73063392bd5e")); //// bu yerda id haqiqatdan ham object id ligi tekshirilyapti
