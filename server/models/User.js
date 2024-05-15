const mongoose=require("mongoose");

const userModel=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
    },
    email:{
     type:String, 
     required:true,
     trim:true
    },
    password:{
     type:String,
     required:true
    },
    token:{
     type:String,
     default:null,
     expires:2*60*60*1000,
    },
    resetPasswordExpires:{
     type:Date
    },
    accountType:{
     type:String,
     required:true,
     enum:["Student","Instructor","Admin"]
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
     courseProgress:[{    //course progress will be array of objects as a student may have access of many courses
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],
     image:{
        type:String
    }
})

module.exports=mongoose.model("User",userModel);