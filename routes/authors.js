const express=require('express')
const router= express.Router()
const Author=require('../models/author')

//All Authors Route
router.get('/',async(req,res)=>{
    try{
        const authors=await Author.find({}) //emtpry flower braces display all 
        res.render('authors/index',{authors:authors})
    }catch{
        res.redirect('/')
    }
    
})

//Search Authors Route
router.get('/search',async (req,res)=>{
    let searchOptions={}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name=new RegExp(req.query.name,'i') //i is case insensitive while used in searching
    }
    try{
        const authors=await Author.find({searchOptions})
        res.render('authors/search',{
            authors:authors,
            searchOptions:req.query
        })
    } catch{
        res.redirect('/')
    }
})

//New Author Route

router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()})
})

//Create Author Route
router.post('/',async (req,res)=>{
        //res.send('Create') //page name Create
        // res.send(req.body.name) //prints on html page, sent by input
        const author=new Author({
            name:req.body.name
        })
        try{
            const newAuthor=await author.save()
            //res.redirect('authors/${newAuthor.id}')
            res.redirect('authors')
        }catch{
            res.render('authors/new',{
                author:author,
                errorMessage:'Error creating Author'
            })
        }
})
module.exports=router