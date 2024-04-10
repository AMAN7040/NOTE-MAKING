require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const ejs = require('ejs');
const path = require('path')
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT||3000;

//CONNECTION OF MONDODB WITH NODEJS
connectDB();  

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Routes
const noteRoute = require('./routes/note');
const userRoute = require('./routes/user');
const {checkForAuthentication} = require('./middleware/checkAuthentication');


app.use(express.json()); // to parse the json data
//middleware to serve the static files in the frontend
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication('token'));


//route handler for the homepage
app.get('/', (req,res)=>{
    res.render('index',{
       user: req.user,
    });
})

app.use('/note', noteRoute);
app.use('/user', userRoute);


app.listen(PORT, ()=>{
    console.log(`Server running at port http://localhost:${PORT}`);
})