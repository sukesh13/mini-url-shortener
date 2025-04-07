const express=require('express');
const router=express.Router();
const URL=require('../models/url');
const {restrictTo}=require('../middleware/auth');
router.get('/',restrictTo(['NORMAL',"ADMIN"]),async (req,res)=>{
    const allUrls=await URL.find({createdBy:req.user._id});
    return res.render('home',{
        urls:allUrls,
    });
})
router.get('/admins/urls',restrictTo(['ADMIN']),async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls:allUrls,
    });
})
router.get('/signup',(req,res)=>{
    return res.render('signup');
});
router.get('/login',(req,res)=>{
    res.render('login');
})
module.exports=router;