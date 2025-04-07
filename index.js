const express = require('express');
const app = express();
const urlRouter = require('./routes/url');
const connectToMongoDb=require('./connection.js');
const URL=require('./models/url');
const path=require('path');
const staticRouter=require('./routes/staticRouter');
const userRouter=require('./routes/user');
const cookieParser=require('cookie-parser');
const {checkForAuthentication,restrictTo}=require('./middleware/auth');
const PORT=8001;
app.use(express.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(express.json());
app.use(checkForAuthentication);
connectToMongoDb('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log('connected to the mongoDB');
})
.catch(()=>{
    console.log('Failed to connect to the mongoDb');
})
app.get('url/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId,
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        },
    }})
    return res.redirect(entry.redirectURL);
})
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.get('/test',async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls:allUrls,
        name:"Reddy",
    });
})
app.use('/url',restrictTo(["NORMAL","ADMIN"]),urlRouter);
app.use('/user',userRouter);
app.use('/',staticRouter);
app.listen(PORT, ()=>{
    console.log(`Server started at the port ${PORT}`);
})