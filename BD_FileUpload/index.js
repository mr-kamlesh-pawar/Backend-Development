const express= require("express")
const app = express();

require("dotenv").config();
const PORT= process.env.PORT || 4000;

app.use(express.json());

//middleware
const fileUpload= require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp/'
}))

const db= require("./config/database");
db.connect();


const cloudinary= require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api routes mount
const Upload= require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

app.listen(PORT, ()=>{
    console.log(`App is running at PORT ${PORT}`);
})