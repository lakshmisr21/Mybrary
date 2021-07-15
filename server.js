//Library Project https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM
//npm init -y //install packages dependencies
//npm i express ejs express-ejs-layouts //install package dependency
//npm i --save-dev nodemon //install development dependencies to refresh/restart server everytime change is made in server.js
//npm i --save-dev dotenv
//npm i body-parser // Library to acces input elements from server 
//npm i multer //to work with multi platform to retrieve name from the file image
//const fs =require('fs') -fs is to remove the file saved which is not suppose to be like without error

//mongodb installation link https://www.mongodb.com/try/download/community
//npm i mongoose
//mongodb Atlas configuration to deploy in Heroku App User/Password
//https://account.mongodb.com/account/login?signedOut=true
//googleaccount srlakshmi.2003@gmail.com
//user:9XwMkj4kDV94AqHP
//connection menthod string
//mongodb+srv://user:<password>@cluster0.n7dew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//In Heroku>Settings>Config Vars
//copy from .env file to enter KEY & VALUE (password section with mongodb connection password) as below
// DATABASE_URL
//mongodb+srv://user:9XwMkj4kDV94AqHP@cluster0.n7dew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority



//Git Installation link https://git-scm.com/downloads
//set up Application with Git 
//git init 
//create .gitignore file and add files which should not be shared in public
//git add .  //grey files are the one which are in .gitignore and rest in greee
//git commit -m "Initial Setup"
//create repository on github then pase below two commands on terminal
//git remote add origin git@github.com:lakshmisr21/Mybrary.git
//git push -u origin main

//DEPLOY APP on HEROKU
//post heroku CLI installed type below on terminal gitbash
//heroku login
//heroku git:remote -a myweb-app-srl //clone the repository
//git push heroku HEAD:master

//Post changes made to the source code below steps to add,push to git hub and heroku - on terminal git bash
//git add .
// git commit -m "Initial Author Routes"
//git push
//git push heroku HEAD:master

//npm run devStart //To run server

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const bodyParser=require('express')


const indexRouter=require('./routes/index')
const authorRouter=require('./routes/authors')
const bookRouter=require('./routes/books')

app.set('view engine','ejs')
app.set('views',__dirname +'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

//setting database & connection

const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=> console.error(error))
db.once('open',()=>console.log('Connected to Mongoose'))

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)

app.listen(process.env.PORT||3000) // process.env.PORT tells it is listening to which PORT