const mongoose= require("mongoose");

require('dotenv').config();

const dbConnect= ()=>{
    mongoose.connect(process.env.DATABASE_URL,
        {
            useNewurlParser:true,
            useUnifiedTopology:true
        }
    )
    .then(()=>{
        console.log("DataBase Connection Sucessfull"); })
    .catch((error)=>{ 
        console.log("DataBase Connection Error");
        console.error(error.message);
        process.exit(1);
        
    })
}

module.exports=dbConnect;