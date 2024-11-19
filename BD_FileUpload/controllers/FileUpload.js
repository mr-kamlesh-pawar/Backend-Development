const File= require("../models/File");
const cloudinary= require("cloudinary").v2;

//localFileUpload -> handler Function

exports.localFileUpload= async(req, res)=>{
    try{
        //fetch file
        const file= req.files.file;
        console.log("File : ",file)

        let path= __dirname + "/files" +Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path: ", path)

        file.mv(path, (err)=>{
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local file uploaded sucessfully"
        })

    }
    catch(error){
        console.log(error);


    }
}


function isFileTypeSuppoerted(type, supportedTypes){
    return supportedTypes.includes(type); 
}

  async function uploadFileToCloudinary(file, folder, quality){
    const options={folder}

    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
       return  await cloudinary.uploader.upload(file.tempFilePath,options);

  }

//imageUpload -> upload img on cloudinary
exports.imageUpload= async (req,res)=>{
    try{
        //fetch data
        const {name, tag, email}= req.body;
        
        console.log(name , tag, email);

        //fetch file
        const file= req.files.file; //file -> is a key value in req we can use any name instead of file

        //validation of formats
        const supportedTypes= ["jpg", "jpeg", "png"];

        const fileType= file.name.split(".").at(-1).toLowerCase();
        console.log("FileType: " , fileType);

        //if  not supported
        if(!isFileTypeSuppoerted(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type is not supported",

            })
        }

        //if supported
        const response= await uploadFileToCloudinary(file, "Kpawar");

        console.log(response);


        //save entry in DB
        const fileData= await File.create({
            name,
            tag,
            email,
            imageUrl:response.secure_url
        })


        res.status(200).json({
            success : true,
            imageUrl: response.secure_url,
            message: "File uploaded successfully",

        })


    } catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"

        })

    }
}


//videoUpload -> upload video on cloudinary and save entry in db

exports.videoUpload= async (req, res)=>{
    try{

        const {name, tag, email}= req.body;

        const file= req.files.videoFile;


        //validation

        const supportedTypes=["mp4","mov"];
        const fileType= file.name.split(".").at(-1).toLowerCase();
        console.log("FileType: ", fileType);

        //PENDING: add limit of 5mb

        if(!isFileTypeSuppoerted(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "Video file type is not Supported"
            })
        }

        //file format supported hai to
        console.log("Uploading a file on clodinary..");

        const response=await uploadFileToCloudinary(file, "Kpawar");
        console.log("Video Response: ",response);


        //db me entry save karni hai

        const fileData= await File.create({
            name,
            tag,
            email,
            videoUrl: response.secure_url,

        })
        
        res.status(200).json({
            success: true,
            videoUrl: response.secure_url,
            message: "Video upload Sucessfully",
        })





    } catch(error){

        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


//imageSizeReducer -> reduce img size and upload

exports.imageSizeReducer= async (req,res)=>{
    try{
        //fetch data
        const {name, tag, email}= req.body;
        console.log(name , tag, email);

        //fetch file
        const file= req.files.file; //file -> is a key value in req we can use any name instead of file

        //validation of formats
        const supportedTypes= ["jpg", "jpeg", "png"];

        const fileType= file.name.split(".").at(-1).toLowerCase();
        console.log("FileType: " , fileType);

        //if  not supported
        if(!isFileTypeSuppoerted(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type is not supported",

            })
        }

        //if supported add a third parameter quality = 40
        const response= await uploadFileToCloudinary(file, "Kpawar", 40);

        console.log(response);


        //save entry in DB
        const fileData= await File.create({
            name,
            tag,
            email,
            imageUrl:response.secure_url
        })


        res.status(200).json({
            success : true,
            imageUrl: response.secure_url,
            message: "File uploaded successfully",

        })


    } catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}