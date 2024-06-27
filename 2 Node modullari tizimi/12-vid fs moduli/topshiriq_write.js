const fs = require("fs");
// fs.writeFile(file: fs.writtenFromNode.js, );

// writeFile(file: fs.PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, options: fs.WriteFileOptions, callback: fs.NoParamCallback): void

// import { writeFile } from "fs";
// import { Buffer } from "buffer";
// const data = new Uint8Array(Buffer.from("Hello Node.js"));
const data = "Hello Jahongir";
fs.writeFile(`written.txt`, data, "utf8", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});

