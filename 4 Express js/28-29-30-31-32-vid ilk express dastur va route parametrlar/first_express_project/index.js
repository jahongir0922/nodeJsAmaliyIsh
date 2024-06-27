const express=require('express')
const app=express()
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
    if(!req.body.name){
        res.status(400).send('Name is required')
        return;
    }
    if(req.body.name.length<3){
        res.status(400).send('Name should be at least 3 character')
        return;
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
        res.status(404).send('berilgan idga teng bo\'lgan kitob topilmadi')
    }
    res.send(book)
})
app.get('/api/articles/:year/:month', (req, res)=>{
    res.send(req.params)
})
app.get('/api/articles', (req, res)=>{
    res.send(req.query)
})
const port=process.env.PORT||5000
app.listen(port, ()=>{
    console.log(`I have been litened port number of ${port}...`);
})