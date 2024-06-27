const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/test")
  .then(() => {
    console.log("mongoDBga ulandi");
  })
  .catch(() => {
    console.log("MongoDbga ulanishda xatolik");
  });
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  author: String,
  tags: {
    type: Array,

    //custum sinxron validation
    // validate: {
    //   validator: function (v) {
    //     return v && v.length > 0;
    //   },
    //   message: "Kitobning kamida bitta tegi bo'lishi kerak",
    // },
    //custum sinxron validation

    //custum asinxron validation
    validate: {
      validator: async function (v) {
        return await new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve(v && v.length > 0);
          }, 1000);
        });
      },
      message: "Kitobning kamida bitta tegi bo'lishi kerak",
    },
    //custum asinxron validation
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 300,
    get: (val) => Math.round(val), ///schema types
    set: (val) => Math.round(val), ///schema types
  },
  category: {
    type: String,
    required: true,
    enum: ["classic", "biography", "science"],
    lowercase: true, ///schema types
    trim: true, ///schema types
  },
});
const Book = mongoose.model("Book", bookSchema);

async function createBook() {
  const book = new Book({
    name: "Node.js darslari va mongoose",
    author: "Qodirov Jahongir validate trim",
    tags: ["Node.js", "Backend", "Mongoose"],
    isPublished: true,
    price: 250.5,
    category: " Classic",
  });
  try {
    const savedBook = await book.save();
    console.log(savedBook);
  } catch (ex) {
    console.log(ex);
  }
}
async function getBooks() {
  const books = await Book.find({})

    .select({ name: 1, tags: 1 });
  console.log(books);
}
// getBooks();
createBook();
