const fs = require("fs");
fs.rename("written.txt", "renamed.txt", function (err) {
  if (err) throw err;
  console.log("The file has been renamed");
});
