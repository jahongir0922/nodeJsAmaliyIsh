const express=require('express')
const app=express()
// const Joi=require('joi')
const Joi = require("@hapi/joi");
app.use(express.json())
const books=[
    {id: 1, name: 'rich dad poor dad'},
    {id: 2, name: 'good to great'},
    {id: 3, name: 'rework'},
]
app.get('/', (req, res)=>{
    res.send('salom')
})
app.get('/api/books', (req, res)=>{
    res.send(books)
})
app.post('/api/books', (req, res)=>{
    const {error}=validateBook(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
        const book={
            id: books.length+1,
            name: req.body.name
        }
        books.push(book)
        res.status(201).send(book)
    
})
app.get('/api/books/:id', (req, res)=>{
    const book=books.find(b=>b.id===parseInt(req.params.id))
    if(!book){
        return res.status(404).send('berilgan idga teng bo\'lgan kitob topilmadi')
    }
    res.send(book)
})
app.put('/api/books/:id', (req, res)=>{
    //kitobni bazadan izlab topish
    //agar kitob mavjud bo'lmasa 404 qaytarish
    const book=books.find(b=>b.id===parseInt(req.params.id))
    if(!book){
        return res.status(404).send('berilgan idga teng bo\'lgan kitob topilmadi')
    }
    //agar kitob topilsa sorovni validatsiya qilish
    //agar so'rov validatsiyadan o'tmasa 400 qaytarish
    const {error}=validateBook(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    //agar hammasi ok bo'lsa kitobni yangilash
    book.name=req.body.name
    //yangilangan kitobni qaytarish
    res.send(book)
})
app.get('/api/articles', (req, res)=>{
    res.send(req.query)
})
function validateBook(book){
    const bookSchema={
        name: Joi.string().required().min(3)
    };
    return Joi.validate(book, bookSchema)
}
const port=process.env.PORT||5000
app.listen(port, ()=>{
    console.log(`I have been listened port number of ${port}...`);
})