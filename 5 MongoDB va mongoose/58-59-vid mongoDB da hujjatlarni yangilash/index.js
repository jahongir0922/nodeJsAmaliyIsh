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
async function updateBook1(id) {
  const book = await Book.findById(id);
  if (!book) {
    return;
  }
  ////birinchi usul
  book.language = "Uzbek";
  book.name = "Nodejs daturlash";
  ////birinchi usul

  ////ikkinchi usul
  // book.set({
  //   language: "Uzbek",
  //   name: "Nodejs daturlash set",
  // });
  ////ikkinchi usul

  book.save();
  console.log(book);
}
async function updateBook2(id) {
  // const result = await Book.updateMany    //bu operator bir nechta obyektlarni update qiladi
  const result = await Book.updateOne(
    { _id: id },
    {
      $set: {
        language: "Uzbek many",
        name: "Nodejs daturlash many",
      },
    }
  );

  console.log(result);
}
async function deleteBook(language) {
  // const result = await Book.deleteOne({ _id: id });  //bu kod obyektni o'chirib yuboradi va natijani qaytaradi
  // const book = await Book.findByIdAndDelete({ _id: id }); //bu kod o'chirilgan obyektni qaytaradi

  // console.log(language);
  const delMany = await Book.deleteMany({ version: { $gt: 5 } }); //bu kod o'chirilgan obyektni qaytaradi

  console.log(delMany);
}
deleteBook("Setswana");
