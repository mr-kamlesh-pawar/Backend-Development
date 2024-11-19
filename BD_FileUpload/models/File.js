const mongoose= require("mongoose");
const nodeMailer= require("nodemailer");

require("dotenv").config();

const fileSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    imageUrl:{
        type:String,
        
        
    },
    tag:{
        type:String,
        required:true
       
    },
    email:{
        type: String,
        required:true
    },
    videoUrl:{
        type:String, 
    }
});

//post middleware for nodeMailer
 fileSchema.post("save", async function (doc) {
    try{
        console.log("DOC: ",doc);

        //transporter
        let transporter= nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }

        });

        //send MAil

        let info = await transporter.sendMail({
            from: `Kpawar`,
            to: doc.email,
            subject:"New File Uploaded",
            html:`<h1>Hello Jee </h1> <p>File Uploaded </p>`
             
        });

        console.log("Info Obj for sending mail : ",info)


    } catch(error){

    }
    
 })

const file= mongoose.model("File", fileSchema);
module.exports=file;