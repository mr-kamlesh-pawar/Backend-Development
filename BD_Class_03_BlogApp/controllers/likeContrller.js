const Like= require("../models/likeModel");
const Post= require("../models/postModel");

exports.likePost= async (req, res)=>{
    try{

            const {user, post}= req.body;
            const like= new Like({
                post, user
            });

            const savedLike=  await like.save();

            const updatedPost= await Post.findByIdAndUpdate(post,
                {$push: {likes : savedLike._id}}, {new:true}
            ). populate('likes').exec();

        res.json({
            posts: updatedPost
            
        })
    }
    catch(err){
        res.status(500).json({

            err: "error while post like"
        })
    }
}


exports.unlikePost= async (req, res)=>{
    try{
         const {post, like}= req.body;

            //delete like
         const deletedLike= await Like.findByIdAndDelete({post:post, _id:like});

         //delete like id from post collection
         const updatedPost= await Post.findByIdAndUpdate(post, {$pull: {likes:deletedLike._id} }, {new:true})
       
         res.json({
            post: updatedPost,
         })
    }
    catch(err){
        res.status(500).json({

            err: "error while post unlike"
        })
    }
}