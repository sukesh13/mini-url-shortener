const shortid=require('shortid');
const URL=require('../models/url');
async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body||!body.url){
        return res.status(400).json({error:"URL required"});
    }
    const shortId=shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectURL:body.url,
        visitedHistory:[],
        createdBy:req.user._id,
    })
    return res.render('home',{
        shortId:shortId,
    })
}
async function handlegetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory,});
}
module.exports={handleGenerateNewShortURL,handlegetAnalytics};