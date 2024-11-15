const Post= require("../models/postModel");

exports.createPost=  async (req, res)=>{
 try{
    const {title, body}= req.body;
    const post= new Post({
        title , body
    });
    
    const savePost=  await post.save();

    res.json({
        post: savePost,
    })
 }

 catch(err){
    return res.status(500).json({
        err: "Post Creation Error "
    })

 }
};

exports.getAllPost= async(req,res)=>{
    try{
            const allPost= await Post.find().populate("likes").populate("comments").exec();
            res.json({
                allPost
            })
    } catch(err){
        return res.status(500).json({
            err: "Post fetch Error "
        })

    }
}