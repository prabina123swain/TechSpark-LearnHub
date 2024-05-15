const mongoose=require("mongoose");
const mailSender = require("../Utils/mailSender");

const OTPSchema=new mongoose.Schema({
     email:{
        type:String,
        required:true
     },
     otp:{
        type:Number,
        required:true
     },
     createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000,
     }
});

//Creating pre middleware
//Sending mail before save data to database i.e during sign up for email verification


async function sendVerificationMail(email,otp){
    try{
       console.log(email);
       const info=await mailSender(email,"Email verification OTP ",`Your OTP for verification is <h2>${otp}</h2>`); //send mail function is defined in utils which helps to utilize on sending email
       console.log(`OTP send to ${email} successfully  `, info);
    }
    catch(err){
        console.log("Error  occurred during  sending OTP \n",err);
    }
}

OTPSchema.pre("save",async function(next){
    //console.log("email in otp schema ",this.email);
    await sendVerificationMail(this.email,this.otp);
    next();
})

module.exports=mongoose.model("OTP",OTPSchema);