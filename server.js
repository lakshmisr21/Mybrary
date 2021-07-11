//Library Project //https://www.youtube.com/watch?v=qj2oDkvc4dQ&list=PLZlA0Gpn_vH8jbFkBjOuFjhxANC63OmXM&index=6
//npm init -y //install package dependencies
//npm i express ejs express-ejs-layouts //install package dependency
//npm i --save-dev nodemon //install development dependencies to refresh/restart server everytime change is made in server.js
//mongodb installation link https://www.mongodb.com/try/download/community
//npm i mongoose
//npm i --save-dev dotenv
//Git Installation link https://git-scm.com/downloads
//set up Application with Git 
//git init 
//create .gitignore file and add files which should not be shared in public
//git add .  //grey files are the one which are in .gitignore and rest in greee
// git config --global user.email "sr.lakshmi2003@gmail.com"
//git commit -m "Initial Setup"
//git push -u origin main
//npm run devStart //To run server

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const indexRouter=require('./routes/index')
//const dotenv=require('dotenv')

app.set('view engine','ejs')
app.set('views',__dirname +'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//setting database & connection

const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=> console.error(error))
db.once('open',()=>console.log('Connected to Mongoose'))

app.use('/',indexRouter)

app.listen(process.env.PORT||3000) // process.env.PORT tells it is listening to which PORT