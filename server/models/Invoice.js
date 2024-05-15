const mongoose=require("mongoose");

const invoiceModel=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    courseName:{
        type:String,
        required:true
    },
    price:{
       type:Number,
       required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true  
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId
    }
})

module.exports=mongoose.model("Invoice",invoiceModel);