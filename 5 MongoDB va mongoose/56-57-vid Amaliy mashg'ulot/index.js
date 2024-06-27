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
  language: String,
  id: String,
  bio: String,
  version: Number,
});
const Book = mongoose.model("Book", bookSchema);

async function getBooks() {
  const books = await Book.find({
    version: { $gt: 7, $lt: 8 },
  })
    .sort({ name: 1 })
    .select({ name: 1, language: 1, _id: 0 });
  console.log(books);
}
async function getBooks2() {
  const books = await Book.find({
    version: { $gt: 7, $lt: 8 },
    name: /.*l.*/i,
  })
    .sort({ name: -1 })
    .select({ name: 1, language: 1, _id: 0 });
  console.log(books);
}
// createBook()
getBooks2();
