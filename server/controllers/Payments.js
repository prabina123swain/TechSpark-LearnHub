//take an instance of razorpay which is created at config folder
const { instance } = require("../config/razorpay")
const Course = require("../models/Course");
const User=require("../models/User");
const mailSender=require("../Utils/mailSender");
const mongoose=require("mongoose");
const crypto= require("crypto");

require("dotenv").config();


//capture the payment and intiate razorpay order

exports.capturePayment = async(req,res) => {
     //for transaction we need two data i.e course id and user id
     
     const {courses} = req.body;
    // console.log("courses ",courses);
     if (courses.length === 0) {
        return res.json({ success: false, message: "Please Provide Course ID" })
      }
    //take user id as previously during token decode we have inserted it into req.use follow auth.js middleware
     const userId = req.user.id;
     const uid= new mongoose.Types.ObjectId(userId);

     //perform validation
     let total_amount = 0
    //verify that is there any course exist in this id or not

       for(let course_id of courses) {
        try{
        // console.log(course_id);
       // console.log(uid);
        const courseDetails =await  Course.findById(course_id);
       // console.log(courseDetails);
        if(!courseDetails){
            return res.status(403).json({
                success:false,
                massage:"Course details not found  "
            })
        }
        //check is User alredy purchased the course or not if alredy purchased then return
        total_amount+=courseDetails.price;
        //as we fetch user id from token decode method user id will be in string format ,we have to convert it into object id format
        //check in student enrolled list is corresponding user is exist or not
                //if user exist return it
        if(courseDetails.studentsEnrolled.includes(uid)) {
            return res.status(403).json({
                success:false,
                massage:"User alredy purchased the course "
            })
        }
    } catch(err){
        console.log("Error in fetching course details ",err.message);
        return res.status(403).json({
            success:false,
            massage:"Error in fetching Course details  "
        })
      }
    };  //end of for loop 
    //start creating order
    //info required for order creation

    const amount = total_amount;
    const currency ="INR"

    const options ={
        amount:amount*100 , //amount should be multiplied by 100 to actual amount as per razorpay docs 
        currency:currency,
        receipt: Math.random(Date.now()).toString(), //this option is not mandatory
        // notes:{  //notes are used for addition data which will be used in future during validation of payment and give access of course by course_id to user
        //     course_id: course_id,
        //     userId: userId
        // }
    }

    //Intiate the payment using razorpay instance

    try{
        const paymentResponse= await instance.orders.create(options);
        console.log("payment response ",paymentResponse);

        //resnding successfull payment response 
        res.status(200).json({
          success: true,
          data: paymentResponse,
        })
      } catch(err){
        console.log("error in creating payment order ",err);
        return res.status(500).json({
            success:false,
            massage:"Could not intiate order  ",
        })
    }
}

//We have created the payment but we have to keep track of payment status
//verify payment signature between razorpay and server

//this request will come from razorpay not from frontend 
//as we have created a webhook in razerpay after successfull creatioon of payment the router will hit and this below controller will work
//the below controller is responsible for verifying payment and assign course to student

exports.verifySignature =async (req,res) =>{
    
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    
    const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }
     //for security perpose razorpay performs activities like hashing
     //these steps are definded by razorpay 
     // HMAC- combination of two things 1-Hashing algo and 2-secret key
     //here we create a hmac using crypto that need two things hashing algo and secret
    
    let body = razorpay_order_id + "|" + razorpay_payment_id

   const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
       await enrollStudents(courses, userId, res)
       return res.status(200).json({
            success: true, 
            message: "Payment Verified" 
          })
    }
  else
   return res.status(200).json({ 
            success: false, 
            message: "Payment Failed" 
        })

}

async function enrollStudents(courses, userId, res) {

    if (!courses || !userId) {
        return res.status(400).json({ 
            success: false, 
            message: "Please Provide Course ID and User ID" 
        })
      }
    
    for(const course_id of courses) {

        try{
         // add user id to that courses
           const courseDetails = await Course.findByIdAndUpdate(
                { _id: course_id },
                {$push:{studentsEnrolled:userId}},
                 {new:true});
            
         // add course id to the user 

         console.log("students enrolled",courseDetails ,courseDetails.studentsEnrolled);

         const updatedUser = await User.findByIdAndUpdate(
          {_id:userId},
          {$push:{courses:course_id}},
          {new:true}
         )
          
         if(!courseDetails || !updatedUser) {
          res.status(200).json({
            success:false,
            message:"Course/user Data updation error",
           })
         }

        } catch(err) {
          console.log("Error in course addition ",err.message)
           res.status(200).json({
            success:false,
            message:"failed to enroll course",
           })
          }

        //send mail
    }
}

// send a mail on successfull payment

exports.sendPaymentSuccessEmail=async(req,res) =>{
     
  const { orderId, paymentId, amount } = req.body
  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
       `Dear ${enrolledStudent.firstName} ${enrolledStudent.lastName} ,\n
        your payment is successfull on amount
        ${amount / 100},  with\n  
        Order Id   : ${orderId}, \n
        Payment Id :${paymentId},`      
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}