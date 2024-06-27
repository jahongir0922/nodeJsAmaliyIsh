const fs = require("fs");
fs.unlink("renamed.txt", (err) => {
  if (err) throw err;
  console.log("renamed.txt was deleted");
});
