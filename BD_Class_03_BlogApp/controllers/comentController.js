const Post= require("../models/postModel");
const Comment= require("../models/commentModel");

//logic

exports.createComment= async (req, res)=>{
    try{
        const {post, user, body} = req.body;

        const comment= new Comment({
            post, user, body
        });

        //save new comment into db
        const saveComment=  await comment.save();

        //find the post by id and add a _id in post
        const updatePost= Post.findByIdAndUpdate(post, {$push : {comments: saveComment._id}}, {new: true} )
                            .populate("comments") //populates comments array
                            .exec();

        res.json({
            post: updatePost,

        })


        }
     catch(error){
        res.status(500).json({
            error: "Error while creating comment",
        })
     }
}