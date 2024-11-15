const express= require("express");
const app= express();

require("dotenv").config();

const PORT= process.env.PORT || 4000;

//middleware
app.use(express.json())


//routes
const blog= require("./routes/blog.js");
const dbConnect = require("./config/database");

//mount
app.use("/api/v1", blog);

//start server
app.listen(PORT, ()=>{
    console.log(`Server Started Sucessfully on ${PORT} Port`);
    
});

require("./config/database.js");
dbConnect();

//default route
app.get("/", (req,res)=>{
    res.send("<h1>This is home page</h1> ");
});