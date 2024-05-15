const mongoose=require("mongoose");

const subSectionModel=new mongoose.Schema({
   title:{
        type:String,
        required:true,
        trim:true
    },
   timeDuration:{
       type:String,
   },
   description:{
      type:String,
      required:true
   },
   videoUrl:{
      type:String,
   },
   additionalUrl:{
     type:String
   }
})

module.exports=mongoose.model("SubSection",subSectionModel);