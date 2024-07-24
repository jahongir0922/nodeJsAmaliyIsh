const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/practice3")
  .then(() => {
    console.log("mongoDBga ulandi");
  })
  .catch(() => {
    console.log("MongoDbga ulanishda xatolik");
  });

const authorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: [authorSchema],
    required: true,
  },
});
const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);

async function createBook(title, author) {
  const book = new Book({
    title: title,
    author: author,
  });
  await book.save();
  console.log(book);
}
// async function listBooks() {
//   const books = await Book.find()
//     .populate("author", "firstName -_id")
//     .select("title author");
//   console.log(books);
// }
createBook("e vashshe zo'r kitob", [
  new Author({
    firstName: "Jahongir",
    lastName: "Qodirov",
    email: "qodirovjahongir09@gmail.com",
  }),
  new Author({
    firstName: "Jahongir1",
    lastName: "Qodirov1",
    email: "qodirovjahongir09@gmail.com",
  }),
]);
// listBooks();
