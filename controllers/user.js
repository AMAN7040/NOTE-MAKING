const User = require('../models/user');

//function to get the siginin page
function getSiginPage(req,res){
    return res.render('signin');
};

//function to get the signup page
function getSignupPage(req,res){
    return res.render('signup');
};

//function to make the user sign up
async function makeSignup(req,res){
   const {fullName, email, password} = req.body; 
   try{
    await User.create({
        fullName,
        email,
        password,
       });
       return res.redirect('/');
   }catch(error){
    return res.render('signup',{
        error: "Please enter all the fields"
      })  
   }
}

//function to signin the user
async function userSignin(req,res){
    const {email , password} = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password)
        // console.log(token);
    
        return res.cookie('token', token).redirect('/');
    } catch(error){
      return res.render('signin',{
        error: "Incorrect email or password"
      })  
    }
}

async function logoutUser(req,res){
    res.clearCookie('token').redirect('/');
}

module.exports = {
    getSiginPage,
    getSignupPage,
    makeSignup,
    userSignin,
    logoutUser,
}