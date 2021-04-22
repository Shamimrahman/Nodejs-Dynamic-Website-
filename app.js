require('dotenv').config()

const express=require("express")
const app=express()
const path=require('path')
const port=process.env.PORT || 3000
const hbs=require("hbs")

//package.json a giye thn scripts er under a 
//"start":" node app.js"
//"devs": nodemon app.js

//connect mongobd db
require('./db/connection')

//to get json data from postamn
app.use(express.json())

//Get data from ui
app.use(express.urlencoded({extended:false}))
// ui data end

//get routing module
//const routers=require("./router/routers")
//use  express router
//app.use(routers)

//Run Static page and import css and bootstrap
//middleware
const staticpath=path.join(__dirname, './Public')
app.use('/css',express.static(path.join(__dirname,'./node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname,'./node_modules/bootstrap/dist/js')))
app.use('/jq',express.static(path.join(__dirname,'./node_modules/bootstrap/jquery/dist')))

app.use(express.static(staticpath))
//Run Static page end

//render static page

/*app.get('./',(req,res)=>{
    res.render('index')
})*/


//set env for dynamic page
//set view engine
//Render Dynamic Page with views name change into template
app.set('view engine','hbs')
const templatepath=path.join(__dirname,'./template/views')
app.set("views",templatepath)

//dynamic page env end

//partial start

//Partial use korbo public folder er index ,about file ta fetch 
//korarjonno views folder er index.hbs ,about.hbs a
const partialpath=path.join(__dirname,'./template/partials')
hbs.registerPartials(partialpath)
//partial end

//render dynamic page

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/galary',(req,res)=>{
    res.render('galary')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})

//connect to local host

app.listen(port,()=>{
    console.log(`connected from ${port}`)
})

