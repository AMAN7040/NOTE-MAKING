const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
       const dbURL = process.env.MONGO_URL
       await mongoose.connect(dbURL, 
        // {   useNewUrlParser: true, 
        //     useUnifiedTopology: true}
        );
       console.log("Connected to MongoDB");
    } catch(err){
        console.error("Error connecting to MongoDb", err)
    }
};

module.exports = connectDB;