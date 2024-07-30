
//reset password token is used for sending an token to email 
//by the help of email the user can reset its password 

const mailSender = require("../Utils/mailSender");
const User = require("../models/User");
const crypto=require("crypto");
const bcrypt=require("bcrypt");

exports.resetPasswordToken=async(req,res)=>{
    try{
    //take email from req body
     const {email}=req.body;
    //perfrom email validation
     if(!email){
        return res.status(403).json({
            success:false,
            message:"Email is required ",
        })
     }
     //find details of the user from database and perform validation
     const user=await User.findOne({email:email});
     if(!user){
        return res.status(403).json({
            success:false,
            message:"User not registered ",
        })
     }
     //generate token for which will be send to mail
     //crypto randomUUID generates a random token
     const token=crypto.randomUUID();
     //update the user by adding token and resetPasswordExpirs in DB
   
     const updateUser=await User.findOneAndUpdate(
        {email:email},
        {
        token:token,
        resetPasswordExpires:Date.now()+5*60*1000,
        },
     {new:true});
     //create a url for sending an email
     //url contains token for verification of the valid user
     const url=`http://localhost:3000/reset-password/${token}`;
     await mailSender(email,"Link for reset password ",`<p>Click for reset password <a href="${url}">${url}</a></p>`);

    return res.status(200).json({
        success:true,
        meassage:"Password reset link send successfully ",
        updateUser
    })

    }
    catch(err){
        console.log("error in reset pasword token creation ",err);
        return res.status(500).json({
            success:false,
            message:"Error in sending email reset password ",
        })
    }
};

exports.resetPassword = async(req,res)=>{
   try{
    //UI will sends the token on change password
   // console.log("Inside reset passoword ");
    const {token,password,confirmPassword}=req.body;
    //validation of password
    //console.log("Values -> ",password,confirmPassword,token);
        if(!password || !confirmPassword || !token){
        return res.status(403).json({
            success:false,
            message:"All fields are required ",
        })
     }
     if(password !== confirmPassword){
        return res.status(403).json({
            success:false,
            message:"Password not matched ",
        })
     }
    // console.log("token ",token);
    //find the specific token for specific user
    const user = await User.findOne({token:token});
    if(!user){
        return res.status(403).json({
            success:false,
            message:"Token is invalid ",
        })
     }

    //check expires of token 
   
    if(user.resetPasswordExpires < Date.now()){
        return res.status(403).json({
            success:false,
            message:"Token Expired ",
        });
    }

   // console.log("user for change password ",user);
     //Hashing password for secure password
     const rounds=10;  //rounds define no of rounds for hashing the password
     const hashedPassword=await bcrypt.hash(password,rounds);

   //Update user details to database
   const newuser=await User.findOneAndUpdate(
      {token:token},
      {
       password:hashedPassword,
      },{new:true});
  
    return res.status(200).json({
      success:true,
      message:"reset password successfully ",
      User:newuser
    })
   }
   catch(err){
    //console.log("error in reset password ",err);
    return res.status(500).json({
        success:false,
        message:"Error in reset  password ",
    })
}
}