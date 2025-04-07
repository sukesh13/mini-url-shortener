const express=require('express');
const router=express.Router();
const {handleGenerateNewShortURL,handlegetAnalytics}=require('../controllers/url');
router
.post('/',handleGenerateNewShortURL)
.get('/analytics/:shortId',handlegetAnalytics);
module.exports=router;