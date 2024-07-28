const Course = require("../models/Course");
const Profile=require("../models/Profile");
const User = require("../models/User");
const {uploadToCloudinary, DeleteFromcloudinary }=require("../Utils/ColudinaryUploader");


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
  // console.log("update profile date",req.body);

    const {firstName,lastName,gender,dateOfBirth,about,contactNumber}=req.body;

    if(!gender && !dateOfBirth && !about && !contactNumber && !firstName && !lastName){
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

    if(!userDetails) {
        res.status(401).json({
            success:true,
            message:"unalbe to fetch user",
        })
    }

    const profileId=userDetails.additionalDetails;

     const profileData= await Profile.findByIdAndUpdate(
       profileId,{
       gender:gender,
       dateOfBirth:dateOfBirth,
       about:about,
       contactNumber:contactNumber
     },{new:true});
     
     const updatedUser = await User.findByIdAndUpdate(
        user_id,
        {
          firstName: firstName,
          lastName: lastName
        },
        { new: true } 
      ).populate('additionalDetails').exec();

     //there is another way of updating details i.e fetch profile details
     // const profileDetails= await findById(profileId);
     //add data to profileDetails
     //profileDetails.gender = gender //etc
     //save profile details by save function
     // await profileDetails.save();

     res.status(200).json({
       success:true,
       message:"Profile status updated successfully",
       updatedUser
   })

    }
    catch(err){
       console.log("error in profile updation ",err.message);
       res.status(500).json({
           success:false,
           message:"Profile status updation failed",

       })
    }
}


exports.updateProfilePhoto = async (req, res) => {
  try {
   
    //console.log("body ", req.files);
    // Ensure req.files exists and has profilePhoto

    if (!req.files || !req.files.profilePhoto) {
      return res.status(403).json({
        success: false,
        message: "No data to update",
      });
    }
   

    const profilePhoto = req.files.profilePhoto;

    // Ensure the profilePhoto is provided
    if (!profilePhoto) {
      return res.status(403).json({
        success: false,
        message: "No data to update",
      });
    }

    const user_id = req.user.id;
    const userDetails = await User.findById(user_id);

    // Ensure userDetails exists
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "Unable to fetch user",
      });
    }

    //Delete old photo from cloudinary 

    if(userDetails.image) {
      await DeleteFromcloudinary(
        userDetails.image,
        process.env.FOLDER_NAME,
        'image'
        )
    }

    // Upload the image to Cloudinary
    const uploadedImage = await uploadToCloudinary(
      profilePhoto,
      process.env.FOLDER_NAME
    );

    // console.log(uploadedImage);
    // Update user details with the new profile photo URL
    userDetails.image = uploadedImage.secure_url;
    await userDetails.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      url:uploadedImage.secure_url,
    });
  } catch (err) {
    console.log("Error in profile photo updation ", err.message);
    res.status(500).json({
      success: false,
      message: "Profile photo update failed",
    });
  }
};


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
