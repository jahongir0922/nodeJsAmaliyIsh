const fs = require("fs");
// bu metod papkadagi ma'lumotlarni sinxron o'qish
// const files = fs.readdirSync("./");
// console.log(files);

// bu metod papkadagi ma'lumotlarni asinxron o'qish
// // // var asyncFiles = [];
// fs.readdir("./", function (err, files) {
//   if (err) {
//     // // asyncFiles = [...err];
//     console.log(asyncFiles);
//   } else {
//    // // asyncFiles = [...files];
//     console.log(asyncFiles);
//   }
// });

// bu metod falylarni asinxron o'qish
fs.readFile("./index.js", "utf-8", function (err, fileContent) {
  if (err) throw err;
  console.log(fileContent);
});
