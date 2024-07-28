//In this controller we have to define all the logic related to authentication and authorization
const bcrypt=require("bcrypt");
const otpGenerator = require('otp-generator');
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const OTP=require("../models/OTP");
const Profile=require("../models/Profile");
const mailSender=require("../Utils/mailSender");



require("dotenv").config();

//SendOTP middleware

exports.sendOTP=async(req,res)=>{
    try{
        const {email}=req.body;
       // console.log("email for sending otp " ,email);
        const isUserExist=await User.findOne({email:email});
        if(isUserExist){
           return res.status(500).json({
               success:false,
               message:"Alredy Registered User",
           })  
        }
        //Generatr a otp of 6 digit  using package otp-generator
        const otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        //check unique otp or not because it may generate same otp for different user
        const checkOTPExist=await OTP.findOne({otp});

        while(checkOTPExist){
             otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
             checkOTP=await OTP.findOne({otp}); 
        }

        //console.log("OTP Generated ->",otp);

        const otpPayload={email,otp};
        //create an entry for otp ,as we have defined expires in OTP model 
        //so otp data will automatically deleted from DB after expires occure

        const createdOTP=await OTP.create(otpPayload);
       // console.log("Created OTP is",createdOTP);

        return res.status(200).json({
            success:true,
            message:"OTP send successfully ",
            OTP:createdOTP
        })
        
    }
    catch(err){
       // console.log("Error in Sending OTP  ",err);
        return res.status(500).json({
            success:false,
            message:"Error in Sending OTP ",
        })
    }
}

//Sign UP middleware

exports.Signup=async (req,res)=>{
    try{
     //fetch data from req.body
        const {  
         firstName,
         lastName,        
         email,    
         accountType, 
         password,        
         confirmPassword,
         contactNumber,
         // countrycode,
         otp
        } =req.body;
      //  console.log(email,password,confirmPassword,firstName,lastName,accountType,otp);
      //check all required details are filled or not
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(500).json({
                success:false,
                message:"All fields are required", 
            })
        }
      //check entry password matched or not  
        if(password !== confirmPassword){
            return res.status(500).json({
                success:false,
                message:"Password does not matched",
            })
         }

       //check for existing user
        const isUserExist=await User.findOne({email});
        if(isUserExist){
           return res.status(400).json({
               success:false,
               message:"Alredy Registered User ",
           })  
        }

      //find most recent otp entry in DB as at some instance of time many otp for same user may exist in DB
      const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
      //recentOtp is an array of otp so first index value is required object
      //console.log("Recent entered otp is ",recentOtp[0].otp);
      //validate the otp
      if(recentOtp.length===0){
        return res.status(400).json({
            success:false,
            message:"OTP not found ",
        })
       }
       else if(otp!=recentOtp[0].otp){
        //console.log(otp,recentOtp[0].otp);
        return res.status(400).json({
            success:false,
            message:"Enter a valid otp",
        })
       }

     //Hashing password for secure password
      const rounds=10;  //rounds define no of rounds for hashing the password
      let hashedPassword;
      try{
        hashedPassword= await bcrypt.hash(password,rounds);
      }
      catch(err){
        return res.status(402).json({
            success:false,
            message:'error in encrypting password '
        })
      }
       //console.log("Hashed password is ",hashedPassword);
     //We need to create a profile because there exist one-to-one mapping
     //between user and user profile as user is registred correspoding profile is being created
     const profile=await Profile.create({
         gender:null,
         dateOfBirth:null,
         about:null,
         contactNumber:null,
     });

    //insert user details to database
    const user=await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        accountType,
        additionalDetails:profile._id,  
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`  //api call for creating image using name
    })
   
     return res.status(200).json({
       success:true,
       message:"User registered successfully ",
       user
     })
    }
    
    catch(err){
       // console.log("error in sign up",err);
       return res.status(500).json({
           success:false,
           message:"Error in Sign up the user please try again",
       })
    }
}

//Login

exports.login = async(req,res) =>{
    try{
        const {email,password}=req.body;
        //console.log("req body ",req.body);
        if(!email || !password){
            return res.status(500).json({
                success:false,
                message:"All details are required for login",
            }) 
        }
       //find details of user from database
        const user = await User.findOne({email}).populate("additionalDetails").exec();
        
        //check user is exist or not 
        if(!user){
           return res.status(500).json({
               success:false,
               message:"User is not registered do registration",
           })  
        }

       //match the password 
       const matched=await bcrypt.compare(password,user.password);
       if(!matched){
        return res.status(401).json({
            success:false,
            message:"Password is not matched  ",
        })
       }
     //perform tokenization
     //create json web token by jwt.sign(payload, secretOrPrivateKey, [options, callback])
     const payload={
        email:user.email,
        id:user._id,
        accountType:user.accountType
     };
    //jwt creation requires 3 things payload(all info related to store),secret key,options(contains additional info)
     const token=await jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"3h" });
     
    // console.log("token created ",token);
     //insert token to user body for use during authorization
     user.toObject();
     user.token=token;
     //change password to undefined fro security perpose ,It will not affect DB data i.e password will not change in DB
     user.password=undefined;
     
     //insert a token to cooike for instance action
     //cookie creation has 3 parts 1-cookie name,2-data to store 3-options
     const options={
        expiresIn:new Date(Date.now()+3*24*60*60*1000), //3 days from current time
        httpOnly:true
     }
     res.cookie("token",token,options).status(200).json({
        success:true,
        message:"Logged  in successfully ",
        user
     })

    }
    catch(err){
        //console.log("error in log in ",err);
        return res.status(500).json({
            success:false,
            message:"Error in Login the user please try again",
        })
    }
}

//Change Password 

exports.changPassword=async(req,res)=>{
    try{
      const {email,newPassword,confirmNewPassword}=req.body;

      if(!email || ! newPassword || confirmNewPassword){
        return res.status(402).json({
            success:false,
            message:"ALl fields are required for change password ",
        })
      }
      //check validation of password 
      if(newPassword!==confirmNewPassword){
        return res.status(401).json({
            success:false,
            message:"Password can not matched for change password ",
        })
       }

      //Hashing password for secure password
      const rounds=10;  //rounds define no of rounds for hashing the password
      const hashedPassword=await bcrypt.hash(password,rounds,function(err){
        if(err)
        console.log("error in Hashing password");
       })
       //update password in database
       const user=await User.findOneAndUpdate({email:email},{$set:{password:hashedPassword}},{new:true});

       //send email for updated passward 
        try{
            await mailSender(email,"request for change password","password changed successfully");
        }
        catch(err){
        return res.status(500).json({
            success:false,
            message:"Error in send email for change password ",
        })}

       return res.status(200).json({
        success:true,
        message:"Password Changed Successfully ",
        user:user
      })
    }
    catch(err){
       // console.log("error in change password ",err);
        return res.status(500).json({
            success:false,
            message:"Error in change password ",
        })
    }
}