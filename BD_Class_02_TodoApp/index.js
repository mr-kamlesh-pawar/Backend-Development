const express= require("express");
const app=express();

//import dotenv
require("dotenv").config();

const PORT= process.env.PORT || 4000;

//middleware to parse json req body
app.use(express.json());


//import routes for Todo API
const todoRoutes= require('./routes/todos');

//mount the todo api routes
app.use("/api/v1", todoRoutes);

//start server
app.listen(PORT, ()=>{
    console.log(`Server started Sucessfully at Port ${PORT}`);
    });

//connect to DB
 const dbConnect= require('./config/database');
 dbConnect();

 //default route
 app.get("/", (req,res)=>{
    res.send(`<h1> This is HomePage </h1>`);

 })