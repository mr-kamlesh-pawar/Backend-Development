//import the model
const Todo= require('../models/Todo');


//define route handler

exports.deleteTodo= async(req,res)=>{
    try{
        const {id}=req.params;

        
        const todo= await Todo.findByIdAndDelete(id);

        // If the todo with the given ID was not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                data:todo,
                message: "Todo not found",
            });
        }

        // If the update is successful
        res.status(200).json({
            success: true,
            message: "Todo Deleted successfully"
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


