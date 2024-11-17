const mongoose= require("mongoose");

require("dotenv").config();

exports.connect= ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database Connectes Sucessfully...")
        
    })
    .catch((error)=> {
        console.log("Database Connectivity Issue");
        console.log(error);
        process.exit(1);
        
    });

}