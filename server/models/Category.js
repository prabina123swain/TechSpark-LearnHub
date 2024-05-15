const mongoose=require("mongoose");

const categoryModel=new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     courses:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Course"
   }],
});

module.exports=mongoose.model("Category",categoryModel);