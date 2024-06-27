const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/test')
    .then(()=>{console.log("mongoDBga ulandi");})
    .catch(()=>{console.log("MongoDbga ulanishda xatolik");})
const bookSchema=new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})
const Book=mongoose.model('Book', bookSchema);

async function createBook(){
    const book=new Book({
        name: "Node.js darslari va mongoose",
        author: "Farxod Dadajonov",
        tags: ["Node.js", "Backend", "Mongoose"],
        isPublished: true
    })
    const savedBook=await book.save()
    console.log(savedBook);
}
async function getBooks(){
    // /api/books/?pageNumber=2&pageSize=15
    const pageNumber=2;
    const pageSize=15;

    const books=await Book
    .find({author: "Qodirov Jahongir", isPublished: true})
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
    .sort({name: 1})
    .select({author: 1, tags: 1})
    console.log(books);
}
// createBook()
getBooks()