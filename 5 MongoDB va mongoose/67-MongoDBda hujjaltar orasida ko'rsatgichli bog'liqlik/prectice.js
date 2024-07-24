const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/practice")
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
const Author = mongoose.model("Author", authorSchema);

const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});
const Book = mongoose.model("Book", bookSchema);

async function createAuthor(firstName, lastName, emaill) {
  const author = new Author({
    lastName: lastName,
    firstName: firstName,
    email: email,
  });
  await author.save();
  console.log(author);
}
async function createBook(title, authorId) {
  const book = new Book({
    title: title,
    author: authorId,
  });
  await book.save();
  console.log(book);
}
async function listBooks() {
  const books = await Book.find()
    .populate("author", "firstName -_id")
    .select("title author");
  console.log(books);
}
// createAuthor("Jahongir", "Qodirov", "email@gmail.com");
// createBook("2 - e vashshe zo'r kitob", "667ecf80733d43f468f6e128");
listBooks();
