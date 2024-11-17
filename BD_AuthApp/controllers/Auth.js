const bcrypt= require("bcrypt");
const User= require("../models/User");
const jwt= require("jsonwebtoken");
require("dotenv").config();

//signup
exports.signup= async(req, res)=>{
    try{
        //get data from req body
        const {name, email, password,role}= req.body;

        //validation
        const exitingUser= await User.findOne({email});
        if(exitingUser){
            return res.status(400).json({
                success: false,
                message: "User is already Exists"
            })
        }
        //validation


        //secure password
        let hashPassword;
        try{
            hashPassword= await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Password Hashing Issue"
            })
        }
            //secure password

        //create entry of user in DB

        const user= await User.create({
            name,
            email,
            password:hashPassword,
            role
        })

        //create entry of user in DB

        return res.status(200).json({
            success:true,
            message:"User created Sucessfully"
        })


    } 
    catch(error){
        console.error(error);
        return ress.status(500).json({
            success:false,
            message: "User Can't Register, please try again later"
        })
        
        
    }
}


//login

exports.login = async(req,res)=>{
    try{

        //fetch data from req body
        const {email, password}= req.body;

        //validate
        if(!password || !email){
            return res.status(400).json({
                status: false,
                message: "Please Fill the all details correctly "
            })
        }

        //check user entry is exists in DB
        let user= await User.findOne({email});

        //if not fount entry
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not Register. Please First Signup "
            })
        }



            const payload={
                email: user.email,
                id: user._id,
                role: user.role,
            }

        //verify password and generate JWT token
        const isMatch= await bcrypt.compare(password, user.password);
        if(isMatch){
            //pass match
            //step01 : import jwtwebtoken
            //step02 : jwt.sign(payload, secreateKey, options) method

            let  token= await jwt.sign(payload,
                                 process.env.JWT_SECRET,
                                {
                                    expiresIn: "2h",
                                }
                                );

            user= user.toObject();
                user.token=token;   //pass a token in user Object
                console.log(user);
            user.password=undefined; // removes password in user object
            console.log(user);  

            const options={
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                status: true,
                token,
                user,
                message: "User Logged in Sucessfully"
            })



        }
        
        else{
            //pass do not match
            return res.status(403).json({
                status: false,
                message: "Password Incorrect"
            })

        }
    }
    catch(error){

        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Login Failure",

        })
        

    }
}