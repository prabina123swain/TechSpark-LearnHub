const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const {uploadToCloudinary, DeleteFromcloudinary}=require("../Utils/ColudinaryUploader");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Category = require("../models/Category");

//Course is created by Instructor  
exports.createCourse= async(req,res) => {
    try{
    //take course details from req body 
    const {
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        tags,
        category,
        instructions,
         }=req.body;
         
    console.log(req.body);

     // Convert the tag and instructions from stringified Array to Array
    const tag = JSON.parse(tags)
    const instruction = JSON.parse(instructions)
    // console.log("tag", tag)
    // console.log("instructions", instruction)
   // console.log(req?.files?.thumbnailImage);
    //take course image file from req.files
    const thumbnail=req.files?.thumbnailImage;
   // console.log("thumbnail ",thumbnail);
   // console.log(courseName,courseDescription,price,whatYouWillLearn);
    //data validation
    if(!courseName || !whatYouWillLearn || !price || !courseDescription || !thumbnail){
        return res.status(404).json({
            success:false,
            message:"All fields are required for creating course", 
        })
    }
    //instructor validation 
    //Why its need as we previously verified isInstructon by auth.js in middlewares
    //find instructor from req.body
    let instructorId=req.user.id;
    instructorId = new mongoose.Types.ObjectId(instructorId);

    //upload image to cloudinary
    const img=await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
    console.log(img.secure_url);
    //insert Course details to DB
    const courseDetails=await Course.create({
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        tags:tag,
        instructions:instruction,
        category,
        instructor:instructorId,
        thumbnail:img.secure_url
      });
      console.log("Course details ->",courseDetails);

      //update course id in instructor
      const updatedInstructor=await User.findByIdAndUpdate({_id:instructorId},{$push:{courses:courseDetails._id}},{new:true});
      //console.log("Updated instructor is ",updatedInstructor);
      
      //add course id to that category
      const updatedCategory= await Category.findByIdAndUpdate({_id:category},{$push:{courses:courseDetails._id}},{new:true});
         
    return res.status(200).json({
        success:true,
        message:"Course created  successfully ",
        courseDetails,
        updatedInstructor,
        updatedCategory
      })
    }
    catch(err){
        console.log("error in creating course ",err);
        return res.status(500).json({
            success:false,
            message:"Course  creation failed ",
        })
    }
}

exports.editCourseDetails= async(req,res)=>{
    try{
        const updateValue=req.body;
        console.log("data ",updateValue);

        const courseId=updateValue._id;
       const course = await Course.findById(courseId);
     
        if(!course){
            res.status(202).json({
                success:false,
                message:"course not found"
            })
        }

      if(req.files){
      try{
        const courseimg=req.files.thumbnailImage;
        const uploaedImage= await uploadToCloudinary(
           courseimg,
           process.env.FOLDER_NAME
           )
         course.thumbnail=uploaedImage.secure_url;
      }
      catch(err){
        console.log("error in uploading image ",err);
       }
      }

      for (const key in updateValue) {
        if (updateValue.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
                course[key] = JSON.parse(updateValue[key])
              } else {
                course[key] = updateValue[key]
              }
            }
          }

        const updatedCourse=await course.save();

        console.log("updated course ",updatedCourse);

        res.status(200).json({
            success:true,
            message:"course updated successfully ",
            data:updatedCourse
        })
    }
    catch(err){
       console.log("Error in editing course ",err.message);
       res.status(500).json({
        success:false,
        message:"course updaton failed "
       })
    }
}

exports.showAllCourses =async(req,res) => {
    try {
        console.log("inside  show all courses");
        const allCourses = await Course.find(
          { status: "Published" },
          {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
          }
        )
          .populate("instructor")
          .exec()
    
    return res.status(200).json({
        success:true,
        message:"All Course details fetched successfully ",
        allCourses
      })
    }
    catch(err){
        console.log("error in fetching all course details ",err);
        return res.status(500).json({
            success:false,
            message:"Error in fetching all course details ",
        })
    }
}


exports.getCourseDetails = async (req,res) =>{
     
    try{
    //  console.log("abcd");
    //console.log(req.body);
    const {courseId}= req.body;
    console.log("type " ,typeof courseId);
    console.log("course  id ",courseId);

    if(!courseId){
        return res.status(300).json({
            success:false,
            massage:"Course Id is undefined  "
        })
    }

    //find the course details will all related data
     const courseDetails=await Course.findOne({_id:courseId})
                                            .populate({
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails"
                                                }
                                             })
                                            .populate("category")
                                            .exec();
     //validation 
     if(!courseDetails) {
        return res.status(403).json({
            success:false,
            massage:`Course details not found of id- ${courseId} `
        })
     }
    // console.log("course details ",courseDetails);
     return res.status(200).json({
        success:true,
        message:"couser details fetched successfully ",
        courseDetails:courseDetails
     })
    }
    catch(err){
        console.log("error in getting course details ",err.message);
        return res.status(500).json({
            success:false,
            massage:"Error in finding Course details  "
        })
    }

}


exports.getFullCourseDetails = async (req,res) =>{
     
    try{
    //  console.log("abcd");
    //console.log(req.body);
    const {courseId}= req.body;
    console.log("type " ,typeof courseId);
    console.log("course  id ",courseId);

    if(!courseId){
        return res.status(300).json({
            success:false,
            massage:"Course Id is undefined  "
        })
    }

    //find the course details will all related data
     const courseDetails=await Course.findOne({_id:courseId})
                                            .populate({
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails"
                                                }
                                             })
                                             .populate({
                                                path:"courseContents",
                                                populate:{
                                                    path:"subSection"
                                                }
                                             })
                                            .populate("ratingAndReviews")
                                            .populate("category")
                                            .exec();
     //validation 
     if(!courseDetails) {
        return res.status(403).json({
            success:false,
            massage:`Course details not found of id- ${courseId} `
        })
     }
    // console.log("course details ",courseDetails);
     return res.status(200).json({
        success:true,
        message:"couser details fetched successfully ",
        courseDetails:courseDetails
     })
    }
    catch(err){
        console.log("error in getting course details ",err.message);
        return res.status(500).json({
            success:false,
            massage:"Error in finding Course details  "
        })
    }

}

exports.getInstructorCourseDetails = async(req,res)=>{
       const userId= req.user.id;
       console.log("userid ",userId);
       try{
        const courses=await Course.find(
            {instructor:userId}
            );
     // console.log(courses);
      console.log("first course ",courses[0]);

            res.status(200).json({
                success:true,
                message:" courses found successfully ",
                courses:courses
            })

       }
       catch(err){
            console.log("error in fetching courses ",err.message);
            res.status(300).json({
                success:false,
                message:"Error in finding courses ",
            })
       }
}

exports.getStudentCourseDetails = async(req,res)=>{
    const userId= req.user.id;
    console.log("userid ",userId);
    try{
     const userDetails = await User.findById(userId).populate("courses").exec();
     //console.log("user",userDetails);
     const courses=userDetails.courses;
         res.status(200).json({
             success:true,
             message:"my courses found successfully ",
             courses:courses
         })
    }
    catch(err){
         console.log("error in fetching student courses ",err.message);
         res.status(300).json({
             success:false,
             message:"Error in finding courses ",
         })
    }
}


exports.deleteCourse= async(req,res)=>{
     const {courseId}= req.body;
    console.log("courseId ",courseId);

    try{
         const courseDetails= await Course.findById(courseId);
         //remove course from all user 
        //  let users=courseDetails.studentsEnrolled;
        //  let instructor=courseDetails.instructor;
        //       users={...users,instructor};
          for(const userId of courseDetails.studentsEnrolled){
               await User.findByIdAndUpdate(
                {_id:userId},
                {$pull:{courses:courseId}}
               )
          };
      //delete all sections delete all sub sections related with the course
       console.log("course removed from all users ");
      for(const sectionId of courseDetails.courseContents){
         //find the section details
         const section = await Section.findById(sectionId);
        //if section exists the delete all subsections from section
        console.log("course section ",section);

         if(section){
            for(const subSectionId of section.subSection){
                const subSection= await SubSection.findById(subSectionId);
                console.log("course subsections ",subSection);
                if(subSection){
                //delete subsection lectures from cloudinary
                    await DeleteFromcloudinary(subSection.videoUrl,process.env.FOLDER,'video');
                //delete the subsection from database
                   await SubSection.findByIdAndDelete(subSectionId);
                }
            }
         }
         //delete the section from database
         await Section.findByIdAndDelete(sectionId);
      }
        //deletecourse thumbnail from cloudinary 
        await DeleteFromcloudinary(courseDetails.thumbnail,process.env.FOLDER,'image');

         //remove course from database 
         await Course.findByIdAndDelete(courseId)
         //delete course from instructor
         const updatedUser=await User.findByIdAndUpdate(
            {_id:courseDetails.instructor},
            {$pull:{courses:courseId}}
         ).populate("courses").exec();

        //remove course from course category
        const updatedCategory=await Category.findByIdAndUpdate(
            {_id:courseDetails.category},
            {$pull:{courses:courseId}}
         ).populate("courses").exec();

         
        return res.status(200).json({
         success: true,
         message: "Course deleted successfully",
         updatedCourses:updatedUser.courses

        })
    }
    catch(err){
         console.log("error in deleting courses ",err.message);
         res.status(300).json({
             success:false,
             message:"Error in deleting courses ",
         })
    }
}