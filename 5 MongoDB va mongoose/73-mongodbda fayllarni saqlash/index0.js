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
const mongoURI = "mongodb://localhost:27017/files";

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

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
});
// const storage = new GridFsStorage({url: mongoURI}) //soddaroq usuli

const upload = multer({ storage });

///routelar
app.get("/", (req, res) => {
  if (!gfs) {
    const error = "Kutilmagan xatolik yuz berdi";
    res.send(error);
    process.exit(0);
  }
  gfs.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.render("index", { files: false });
    } else {
      const f = files
        .map((file) => {
          if (
            file.contentType === "image/png" ||
            file.contentType === "image/jpeg"
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
          return file;
        })
        .sort((a, b) => {
          return (
            new Date(b["uploadDate"]).getTime() -
            new Date(a["uploadDate"]).getTime()
          );
        });
      return res.render("index", { files: f });
    }
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("object");
  res.redirect("/");
});

app.get("/files", (req, res) => {
  gfs.find().toArray((err, files) => {
    ////fayl mavjudligini tekshiramiz
    if (!files || files.length === 0) {
      return res.status(404).json({ err: "Birorta ham fayl mavjud emas" });
    }
    return res.json(files);
  });
});

app.get("/files/:filename", (req, res) => {
  const file = gfs
    .find({ filename: req.params.filename })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({ err: "Bunday fayl mavjud emas" });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

app.post("/files/del/:id", (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) {
      return res.status(404).json({ err: err.message });
    }
    res.redirect("/");
  });
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`I have been listened port number of ${port}...`);
});
