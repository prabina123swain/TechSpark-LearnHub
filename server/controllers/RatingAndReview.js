//create rating
//get avg rating
//get all rating

const { default: mongoose } = require("mongoose");
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");

exports.createRatings =async(req,res) => {
    try{
       const {courseId,rating,review}=req.body;
       //decode value during tokenization refer auth.js middleware
       const userId= req.user.id;
       const uId=new mongoose.Types.ObjectId(userId);
      //check if user buyed the course or not as we allow only the users those purchased the course will be give the rating and reviews
      const courseDetails=await Course.findOne(
        {
         _id:courseId,
         studentsEnrolled:{$elemMatch: {$eq: uId}}  //find the couse having course id id coureseId and students enrolled has id uid  //elemMatch -elementmatch and $eq -equals to                                     
        }
      );
  
      if(!courseDetails){
        return res.status(403).json({
            success:false,
            massage:"for rating user have to buy the course "
        })
      }

     //check if user has alredy give rating on course or not as one user can give rating on a course once only
     //check in rating and reviews 
       const alredyReviewed =RatingAndReview.findOne({
              user:uid,
              course:coureseId
       })

       if(alredyReviewed){
        return res.status(403).json({
            success:false,
            massage:"User alredy given the rating "
        })
      }

        const newReview= await RatingAndReview.create({
            user:uId,
            rating:rating,
            review:review,
            course:coureseId
        });
        
        console.log("New Review is ",newReview);

        //update the rating in corresponding course

        const course = await Course.findByIdAndUpdate(courseId,
            {
             $push:{RatingAndReviews:newReview._id}   
            },{new:true}).populate("ratingAndReviews").exec();

        return res.status(200).json({
            success:true,
            massage:"Rating and review created  ",
            review:newReview,
            course
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            massage:"Rating and review creating failed  "
        })
    }
}


exports.getAvgRatings =async(req,res) => {
    try{
        //retrive the course id
       const courseId =req.body.coureseId;
       //using aggregate function find the average
       //This query is for finding all reviews which has given courseid and gropu all ratings and find the average
       const result= await RatingAndReview.aggregate([
         {
            $match:{
                course: new mongoose.Types.ObjectId(courseId)
            }
         },
         {
            $group:{
                _id:null ,                    //basis of applying gropu is not defined so put id is null
                averageRating: {$avg: "rating"}  //find the average rating of the groups
            }
         }
       ])

       console.log("average rating is ",result);
     //return the result
      if(result.length >0 ){
         return res.status(200).json({
            success:true,
            message:"Average rating finds successfully ",
            averageRating:result[0].averageRating
         })
      }

      //if no rating exist
      return res.status(200).json({
        success:true,
        message:"Average rating is 0 no ratings till now ",
        averageRating:0
     })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            massage:"Fetching Average rating failed   "
        })
    }
}

exports.getAllRatings =async(req,res) => {
    try{
        //This query is for finding all the courses and populating all sub parts ans select some info about that object
        const allReviews= await RatingAndReview.find({})
                                                $sort({rating:"desc"})   //sort the array of ratings
                                                .popupate({
                                                    path:"user",
                                                    select:"firstName lastname email image"  //return these details of the user
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"  //return only course name of the course
                                                })
                                                .exec();
        console.log("All Reviews are ",allReviews);

        return res.status(200).json({
            success:true,
            massage:"All Rating and review fetched successfully ",
            reviews:allReviews
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            massage:"Fetching All reviews failed   "
        })
    }
}