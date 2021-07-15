const express=require('express')
const router= express.Router()
router.post('/routes',(req,res)=>{
    res.render('search.ejs')
})

module.exports=router