const express=require('express')
const app=express()
const morgan=require('morgan')
const helmet=require('helmet')
const auth=require('./middleware/auth');
const config=require('config')
const books = require('./routes/books')
const home = require('./routes/home')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('pubic'))
app.use(auth)
app.use(helmet())
app.use('/api/books', books)
app.use('/', home)

app.set('view engine', 'pug')
if(app.get('env')==='development'){
    app.use(morgan('tiny'))
    console.log('Logger ishlayapti...');
    // console.log(process.env.NODE_ENV);
    console.log(app.get('env'));
}
console.log(config.get('name'));
console.log(config.get('mailserver.host'));
// console.log(config.get('mailserver.password'));


const port=process.env.PORT||5000
app.listen(port, ()=>{
    console.log(`I have been listened port number of ${port}...`);
})