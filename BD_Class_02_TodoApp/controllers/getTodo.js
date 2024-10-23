const Todo= require("../models/Todo");

exports.getTodo = async (req,res)=>{
    try{
        //fetch all todos
        const todos= await Todo.find({});

        //response
        res.status(200).json(
            {
                success:true,
                data: todos,
                message:"Entire data is fetched",
            }
        )

    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
            message:"Kuch to error hai",
        })

    }
}

exports.getTodoById= async(req,res)=>{
    try{
        //fetch a todo by id
        const id= req.params.id;
        const todo= await Todo.findById({_id:id});

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "data not found of given id",

            });
        }

        res.status(200).json({
            success:true,
            data: todo,
            message:`data is fetched by id ${id}`,

        })

    }   
    catch(err){
        res.status(500).json({
            success: false,
            error: err.message,
            message:"Kuch to error hai",
        })
    } 
}