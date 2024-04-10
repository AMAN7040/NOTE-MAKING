const { validateToken } = require("../services/authentication");

function checkForAuthentication(cookieName){
    return (req,res,next)=>{
     const tokenCookieValue = req.cookies[cookieName];

     if(!tokenCookieValue){
       return next();
     }
     try{
        const userPayload = validateToken(tokenCookieValue);
        req.user = userPayload;
     }catch(err){}
      return next();
    }
}

const checkForAuthorization = (req,res,next)=>{
  const userId = req.user;

  if(!userId){
    return res.render('signin',{
      error: "Please Login First"
    })
  }
  next();
}

module.exports = {
    checkForAuthentication,
    checkForAuthorization,
    
}