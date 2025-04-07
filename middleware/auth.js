const {getUser} =require('../service/auth');
async function checkForAuthentication(req, res, next) {
    const tokenCookie=req.cookies?.token; 
    req.user=null;
    if(!tokenCookie){
        return next();
    }
    const user=getUser(tokenCookie);
    req.user=user;
    next();
}
// async function restrictToLoggedInUserOnly(req, res,next) {
//     // const userId=req.cookies?.uid; 
//     const userId=req.headers['authorization']; 
//     if(!userId){
//         return res.redirect('/login');
//     }
//     const token=userId.split('Bearer ')[1];//userId format is of the form Bearer HJaNJh23n... i.e, token
//     const user=getUser(token);
//     if(!user){
//         return res.redirect('/login');
//     }
//     req.user=user;
//     next();
// }
// async function checkAuth(req, res, next) {
//     // const userId=req.cookies?.uid; 
//     const userId=req.headers['authorization']; 
//     const token=userId.split('Bearer ')[1]; 
//     const user=getUser(token);
//     req.user=user;
//     next();
// }
//To restrict particularly to Admin (or) individual (or) someone else based on given array of roles
function restrictTo(roles){
    return function(req, res, next){
        if(!req.user){
            return res.redirect('/login');
        }
        if(!roles.includes(req.user.role)){
            return res.end("You are unAuthorised");
        }
        return next();
    }
}
module.exports = {checkForAuthentication,restrictTo}