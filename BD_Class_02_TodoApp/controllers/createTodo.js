//import the model
const Todo= require('../models/Todo');


//define route handler

exports.createTodo= async(req,res)=>{
    try{
        //extract title and description from req body
        const {title, description} =req.body;

        //create a new todo object and insert in database as json
        const response= await Todo.create(
            {
                title,
                description
            }
        );

        //send a json response
        res.status(200).json(
            {
                sucess:true,
                data:response,
                message:"Entry Created Sucessfully"
            }
        )
    } 
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500)
        .json({
            sucess: false,
            data:"Internal Server Error",
            message:err.message,

        })
        
        
        

    }


}


