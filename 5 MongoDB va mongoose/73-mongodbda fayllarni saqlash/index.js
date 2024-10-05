const express = require("express");
const app = express();
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
// Middleware
app.use(express.json());
app.set("view engine", "ejs");

// DB
const mongoURI = require("mongodb://localhost/files");

// connection
const conn = mongoose.createConnection(mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// init gfs
let gfs
conn.once("open", ()=>{
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
})
   
// Storage 
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
})
// const enrolmentsRouter = require("./routes/enrolments");

mongoose
  .connect("mongodb://localhost/files")
  .then(() => {
    console.log("mongoDBga ulandi");
  })
  .catch(() => {
    console.log("MongoDbga ulanishda xatolik");
  });

// app.use("/api/enrolments", enrolmentsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`I have been listened port number of ${port}...`);
});
