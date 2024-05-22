const express=require("express");
const app=express();
require("dotenv").config();

const userRoute = require("./routes/user");
const courseRoute= require("./routes/course");
const paymentRoute= require("./routes/payment");
const profileRoute = require("./routes/profile");

const cloudinaryConnect = require("./config/cloudinary");
const databaseConnect = require("./config/database");

const cookieParser= require("cookie-parser");
const cors = require("cors");  //backend entertain request of frontend
const fileUpload = require('express-fileupload');  //When you upload a file, the file will be accessible from req.files.

const PORT = process.env.PORT || 4000 ;

//connect to database
databaseConnect();
//connect to cloudinary
cloudinaryConnect.connect();
//add middleware

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:""https://tech-spark-learn-hub.vercel.app"",  ///these are options for cors
        credentials:true
    })
)
app.use(
    fileUpload({
     useTempFiles:true,
     tempFileDir:"/tmp"
    })
)

app.use("/api/v1/auth",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/payment",paymentRoute);

//defaule route
app.get("/",  (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Your server is up and running ..."
    })
})

//activate the server
app.listen(PORT,()=>{
    console.log("app is running at port ",PORT);
})
