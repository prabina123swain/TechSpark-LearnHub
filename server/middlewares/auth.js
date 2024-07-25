//create middlewares for authorization for ->auth,student,instructor,admun

const  jwt  = require("jsonwebtoken");
require("dotenv").config();
//auth

exports.auth=async(req,res,next)=>{
     try{
     //extract token
     const token= req.cookies.token || req.body.token || 
                   req.header("Authorization").replace("Bearer ","");
    // console.log("Auth token ",token);
    //if token not found
     if(!token){
        return res.status(403).json({
            success:false,
            message:"Token not found ",
        })
     }
    //
    try{
     // console.log("key ",process.env.JWT_SECRET_KEY);
			const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
     console.log("token verifird ",);
     //put decoded data to request body for further use
     req.user=decode;
     //console.log(user);
   }
    catch(err){
       console.log("error in token verification ",err.message);
        return res.status(403).json({
            success:false,
            message:" Token does not matched ",
          })
    }
      next();
     }
     catch(err){
        console.log(err.message);
        return res.status(200).json({
            success:false,
            message:"Error while validating authentication user ",
          })
     }
}

//isStudent middleware for verifying the student

exports.isStudent= async (req,res,next)=>{
    //take user data from req i.e inserted during decode of token in auth middleware
     const user=req.user;
     if(user.accountType!="Student"){
        return res.status(405).json({
            success:true,
            message:"This is secured for Student route",
          })
     }
     next();
}

//isInstructor middleware for verifying the Instructor

exports.isInstructor= async (req,res,next)=>{
    //take user data from req i.e inserted during decode of token in auth middleware
     const user=req.user;
     if(user.accountType!="Instructor"){
        return res.status(405).json({
            success:true,
            message:"This is secured for Instructor route",
          })
     }
     next();
}

//isAdmin middleware for verifying the Admin

exports.isAdmin= async (req,res,next)=>{
    //take user data from req i.e inserted during decode of token in auth middleware
     const user=req.user;
     if(user.accountType!="Admin"){
        return res.status(405).json({
            success:true,
            message:"This is secured for Admin route ",
          })
     }
     next();
}


