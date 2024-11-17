const express= require("express");
const router= express.Router();

const {login, signup}= require("../controllers/Auth");
const {auth, isStudent, isAdmin}= require("../middleware/auth");
const User = require("../models/User");

router.post("/login", login);
router.post("/signup", signup);

//testing protected route
router.get("/test", auth, (req,res)=>{
    res.json({
        success:true,
        message:"You are authenticated Testing route",
    })
})




//protected routes
router.get("/student", auth, isStudent, (req,res)=>{
    res.json({
        success:true,
        message: "Welcome for protected route for Students",
    })

});
router.get("/admin", auth, isAdmin, (req,res)=>{
    res.json({
        success:true,
        message: "Welcome for protected route for Admin",
    })

});


//protected routes


//using auth DB interaction
router.get("/getuser", auth, async(req,res)=>{
    try{

    
    const id= req.user.id;
    console.log("ID ", id)
    const user= await User.findById(id);

    res.status(200).json({
        success:true,
        user:user,
        message: "welcome to getuser route",
    });
}
catch(err){
    console.log(err);
    res.status(500).json({
        success:false,
        message: "Error in getuser route",
        
    })
}

});

module.exports= router;