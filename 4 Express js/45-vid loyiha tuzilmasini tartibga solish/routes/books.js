const express=require('express')
const Joi = require("@hapi/joi");
const router=express.Router()
const books=[
    {id: 1, name: 'rich dad poor dad'},
    {id: 2, name: 'good to great'},
    {id: 3, name: 'rework'},
]
router.get('/', (req, res)=>{
    res.send(books)
})
router.post('/', (req, res)=>{
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
router.get('/:id', (req, res)=>{
    const book=books.find(b=>b.id===parseInt(req.params.id))
    if(!book){
        return res.status(404).send('berilgan idga teng bo\'lgan kitob topilmadi')
    }
    res.send(book)
})
router.put('/:id', (req, res)=>{
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
router.delete('/:id', (req, res)=>{
     //kitobni bazadan izlab topish
    //agar kitob mavjud bo'lmasa 404 qaytarish
    const book=books.find(b=>b.id===parseInt(req.params.id))
    if(!book){
        return res.status(404).send('berilgan idga teng bo\'lgan kitob topilmadi')
    }
    //topilsa kitobni bazadan o'chirib yuboramiz
    const bookIndex=books.indexOf(book)
    books.splice(bookIndex, 1)
    //kitobni qaytarib beramiz
    res.send(book)
})

function validateBook(book){
    const bookSchema={
        name: Joi.string().required().min(3)
    };
    return Joi.validate(book, bookSchema)
}
module.exports=router;