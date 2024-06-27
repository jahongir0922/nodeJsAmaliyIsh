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
        author: "Qodirov Jahongir",
        tags: ["Node.js", "Backend", "Mongoose"],
        isPublished: true
    })
    const savedBook=await book.save()
    console.log(savedBook);
}
async function getBooks(){
    const books=await Book.find({
        author: "Qodirov Jahongir", isPublished: true
    })
    .limit(2)
    .sort({name: 1})
    .select({name: 1, tags: 1})
    console.log(books);
}
getBooks()
// createBook()