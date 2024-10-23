//import the model
const Todo= require('../models/Todo');


//define route handler

exports.updateTodo= async(req,res)=>{
    try{
        const {id}=req.params;

        const {title,description}= req.body;
        const todo= await Todo.findByIdAndUpdate(
            id,
            {title, description, updatedAt:Date.now()},
            {new:true}
        );

        // If the todo with the given ID was not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        // If the update is successful
        res.status(200).json({
            success: true,
            data: todo,
            message: "Todo updated successfully"
        });
    } 
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500)
        .json({
            success: false,
            data:"Internal Server Error",
            message:err.message,

        })
        
        
        

    }


}


