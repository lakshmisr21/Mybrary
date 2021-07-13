const express=require('express')
const router= express.Router()
router.post('authors/search',(req,res)=>{
    res.render('search.ejs')
})

module.exports=router