//auth, isStudent, isAdmin

const jwt= require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req, res, next)=>{
    try{

        console.log("body- ", req.body.token);
        console.log("cookie -" , req.cookies.token);
        //console.log("Header -", req.header("Authorization"));


        //extract jwt token
        const token= req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer","");

        if(!token || token==undefined){
            res.status(401).json({
                success: false,
                message: "Token Missing",
            })
        }


        //verify the token
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user=decoded;
        } catch(error){
            res.status(401).json({
                success: false,
                message: "Token Invalid",
            });
        }
next();


    } catch(error){
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token",
        });

    }

}


//for check role is student or not

exports.isStudent=(req, res,next)=>{
    try{
        if((req.user.role !== "Studemt")){
            return res.status(401).json({
                success:false,
                message: "This is a protected route for Student"
            });
        }
        next();
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "User role is not matching"
        })

    }
}


//for check for Admin Role

exports.isAdmin=(req, res,next)=>{
    try{
        if((req.user.role !== "Admin")){
            return res.status(401).json({
                success:false,
                message: "This is a protected route for Admin"
            });
        }
        next();
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "User role is not matching"
        })

    }
}
