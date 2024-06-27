const express=require('express')
const Joi = require("@hapi/joi");
const app=express()
app.use(express.json())

const categories=[
    {id: 1, name: 'Dasturlash'},
    {id: 2, name: 'Ma\'lumotlar ombori'},
    {id: 3, name: 'Kompyuter tarmoqlari'},
]

app.get('/api/categories', (req, res)=>{
    res.send(categories)
})
app.post('/api/categories', (req, res)=>{
    const {error}=validateCategory(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
        const category={
            id: categories.length+1,
            name: req.body.name
        }
        categories.push(category)
        res.status(201).send(category)
    
})
app.get('/api/categories/:id', (req, res)=>{
    const category=categories.find(b=>b.id===parseInt(req.params.id))
    if(!category){
        return res.status(404).send('berilgan idga teng bo\'lgan kitob topilmadi')
    }
    res.send(category)
})
app.put('/api/categories/:id', (req, res)=>{
    //kitobni bazadan izlab topish
    //agar kitob mavjud bo'lmasa 404 qaytarish
    const category=categories.find(b=>b.id===parseInt(req.params.id))
    if(!category){
        return res.status(404).send('berilgan idga teng bo\'lgan kitob topilmadi')
    }
    //agar kitob topilsa sorovni validatsiya qilish
    //agar so'rov validatsiyadan o'tmasa 400 qaytarish
    const {error}=validateCategory(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    //agar hammasi ok bo'lsa kitobni yangilash
    category.name=req.body.name
    //yangilangan kitobni qaytarish
    res.send(category)
})
app.delete('/api/categories/:id', (req, res)=>{
     //kitobni bazadan izlab topish
    //agar kitob mavjud bo'lmasa 404 qaytarish
    const category=categories.find(b=>b.id===parseInt(req.params.id))
    if(!category){
        return res.status(404).send('berilgan idga teng bo\'lgan kitob topilmadi')
    }
    //topilsa kitobni bazadan o'chirib yuboramiz
    const categoryIndex=categories.indexOf(category)
    categories.splice(categoryIndex, 1)
    //kitobni qaytarib beramiz
    res.send(category)
})
app.get('/api/articles', (req, res)=>{
    res.send(req.query)
})
function validateCategory(category){
    const categorySchema={
        name: Joi.string().required().min(3)
    };
    return Joi.validate(category, categorySchema)
}
const port=process.env.PORT||5000
app.listen(port, ()=>{
    console.log(`I have been listened port number of ${port}...`);
})