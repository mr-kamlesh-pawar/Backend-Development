// 1. create folder
// 2. command- npm init -y
// 3. command- npm install express, nodemon
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node index.js",
//     "dev":"nodemon index.js"
//   },
// 4. new file server.js

const express= require('express');
const app= express();

//used to parse req.body in express -> PUT or POST
const bodyParser= require('body-parser');
app.use(bodyParser.json());  //specifically parse json data add it on to the request.body object

app.listen(3000, ()=>{
    console.log("Server started at port no 3000");
    
})

app.get('/', (req,res)=>{
    res.send("hello ji kya haal chal")
})

app.post('/api/cars', (req,res)=>{
    const {name, brand}=req.body;
    console.log(name);
    console.log(brand);
    res.send("Car data submitted Sucessfully");   
    })

    //db connection

    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/MyDatabase', {
        useNewurlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("DB connected");
    })

    .catch((error)=>{
        console.log("Bhai error aa gya",error);
        

    });
    