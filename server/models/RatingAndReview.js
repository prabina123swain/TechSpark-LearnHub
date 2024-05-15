const mongoose=require("mongoose");
const { rawListeners } = require("./User");

const ratingAndReviewModel=new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     course:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Course",
      required:true,
      index:true
     },
     rating:{
        type:Number,
        required:true
     },
     review:{
        type:String,
     }
});

module.exports=mongoose.model("RatingAndReview",ratingAndReviewModel);