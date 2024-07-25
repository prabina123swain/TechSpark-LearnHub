const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const Profile=require("../models/Profile");
const User = require("../models/User");


exports.getUserDetails = async (req,res) => {
    try{
        
        //find id whichi is inserted during authorization i.e decoding of token
        const user_id=req.user.id;
        //find user details;
         //user_id= new mongoose.Types.ObjectId(user_id);
        const userDetails=await User.findById(user_id).populate("additionalDetails").exec();
        res.status(200).json({
            success:true,
            message:"User fetched successfully ",
            user:userDetails
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Finding user details failed ",
        })
    }
}

exports.updateProfile=async (req,res) => {
    try{
   //take profile data from 
    const {gender,dateOfBirth,about,contactNumber}=req.body;

    if(!gender && !dateOfBirth && !about && !contactNumber){
       res.status(403).json({
           success:false,
           message:"No data to update ",
       })
    }
    
    //Now for updation we need profile id but we have not taken profileid from req.body
    //For finding profile id we have ta take user id from request whichi is
    //added to payload during authentication refer sign in controller payload
    //during decode of token in auth.js middleware we have added user to request body
    // as req.user=decode refer Middleare auth.js
    //from there we will first retrive user id and then find profile id

    //finding profile id
    const user_id=req.user.id;
    //find user details from DB
    const userDetails = await User.findById(user_id);
    //fetching profile Id from user details
    const profileId=userDetails.additionalDetails;

     const profileData= await Profile.findByIdAndUpdate(
       profileId,{
       gender:gender,
       dateOfBirth:dateOfBirth,
       about:about,
       contactNumber:contactNumber
     },{new:true});

     //there is another way of updating details i.e fetch profile details
     // const profileDetails= await findById(profileId);
     //add data to profileDetails
     //profileDetails.gender = gender //etc
     //save profile details by save function
     // await profileDetails.save();

     res.status(200).json({
       success:true,
       message:"Profile status updated successfully",
       profileData
   })

    }
    catch(err){
       console.log("error in profile updation ");
       res.status(500).json({
           success:false,
           message:"Profile status updation failed",

       })
    }
}

exports.deleteProfile=async (req,res) => {
    try{
    //Now for delete we need profile id but we have not taken profileid from req.body
    //For finding profile id we have ta take user id from request whichi is
    //added to payload during authentication refer sign in controller payload
    //during decode of token in auth.js middleware we have added user to request body
    // as req.user=decode refer Middleare auth.js
    //from there we will first retrive user id and then find profile id

    //schedule a time for deleting profile
   //cron.schedule(59,59,23,2 () => ( { 
    //finding profile id   
    const user_id=req.user.id;
    //find user details from DB
    const userDetails = await User.findById(user_id);
    //fetching profile Id from user details
    const profileId=userDetails.additionalDetails;
    //before deleting user we have to delete profile object first because after deleting user profile have no value
    const deletedProfile= await Profile.findByIdAndDelete(profileId);
    //Delete the user
    const deletedUser= await User.findByIdAndDelete(user_id);

    //console.log("User and profile deleted ",deletedProfile,deletedUser);

    //after deleting user we also need to remove Students enrolled from course object
    //the user may access multiple courses find all courses id array

    const coursesId=userDetails.courses;
    //console.log("all courses Ids are ",coursesId);

    await Course.updateMany(
       {studentsEnrolled:user_id},
       {$pop:{studentsEnrolled:user_id}}
    )
   // })

    res.status(200).json({
       success:true,
       message:"Profile status deleted successfully",
       profileData
   })

    }
    catch(err){
       console.log("error in profile deletion");
       res.status(500).json({
           success:false,
           message:"Profile status deletion failed",

       })
    }
}
