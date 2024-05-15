const mongoose=require("mongoose");

//couse model have student,course Name,
//description,Instructor,content,rating and reviews
//price, tag,thumbnail ,students enrolled

const courseModel=new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    courseDescription:{
        type:String,
        required:true  
    },
    whatYouWillLearn:{
        type:String,
        required:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    courseContents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    price:{
      type:Number,
      required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    tags:[{
        type:String,
       // ref:"Tag"
    }],
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    thumbnail:{
        type:String,
        //required:true
    },
    instructions: {
        type: [String],
      },
      status: {
        type: String,
        enum: ["Draft", "Published"],
        default:"Draft"
      },
      createdAt: { type: Date, default: Date.now },
    
});

module.exports=mongoose.model("Course",courseModel);