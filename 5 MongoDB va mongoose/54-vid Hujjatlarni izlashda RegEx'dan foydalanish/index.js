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
    const books=await Book
    // .find()
    // .find({author: "Qodirov Jahongir", isPublished: true})
    // .find({author: /^F/}) //Muallifning ismi F harfidan boshlangan hujjatlarni olib beradi
    // .find({author: /ov$/i}) //Muallifning ismi ov harflari bilan tugagan hujjatlarni olib beradi
    .find({author: /.*nov.*/i}) //contains - Muallifning ismida nov so'zi uchragan hujjatlarni olinadi
    // case insensitive - yuqoridagi i harfi katta va kichik harflarni ajratmasdan barchasini chiqarib beradi 

    // .limit(2)
    .sort({name: 1})
    .select({author: 1, tags: 1})
    console.log(books);
}
// createBook()
getBooks()