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
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});
const Book = mongoose.model("Book", bookSchema);

async function createBook() {
  const book = new Book({
    name: "Node.js darslari va mongoose va filter",
    author: "Qodirov Jahongir",
    tags: ["Node.js", "Backend", "Mongoose"],
    isPublished: true,
    price: 11,
  });
  const savedBook = await book.save();
  console.log(savedBook);
}
async function getBooks() {
  const books = await Book.find({
    price: { $gt: 10, $lt: 20 },
    // const books=await Book.find({price: {$in: [11, 15, 20]}
  })
    // .or([{author: "Qodirov Jahongir"}, {isPublished: true}])
    // .and([{author: "Qodirov Jahongir"}, {isPublished: true}])
    .limit(3)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });
  // .countDocuments()
  console.log(books);
}
createBook();
getBooks();
