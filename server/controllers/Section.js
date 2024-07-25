const { mongoose } = require("mongoose");
const Course = require("../models/Course");
const Section=require("../models/Section");
const subSection =require("../models/SubSection");

exports.createSection = async (req,res) =>{
    try{
        const {sectionName,courseId}=req.body;
        //perform validation
       // console.log("section ",sectionName,courseId);
        if(!sectionName || !courseId){
            return res.status(405).json({
                success:false,
                message:"Enter all the details ",
              })
        }
       
       // const courseID=new mongoose.Types.ObjectId(courseId)
        //Insert Section details to Db
        //console.log(courseId);
        const section=await Section.create({sectionName});
        //add Section to corresponding course details
        const updatedCourse= await Course.findByIdAndUpdate(
            courseId,
            {$push:{courseContents:section._id}},
            {new:true}).populate("courseContents").exec();
        
        //console.log("Updated courses ",updatedCourse);
        return res.status(200).json({
            success:true,
            message:"Section created Successfully ",
            updatedCourse
          })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Section creation failed ",
        })
    }
}

//update section 

exports.updateSection = async (req,res) =>{
    try{
        const {sectionName,sectionId,courseId}=req.body;
        //perform validation
        //console.log("Section details ",sectionName,sectionId,courseId);
        if(!sectionName || !sectionId || !courseId){
            return res.status(405).json({
                success:false,
                message:"Enter all the details ",
              })
        }
        //update Section details to Db
       const newSection=await Section.findByIdAndUpdate(
                                              sectionId,
                                              {sectionName:sectionName},
                                              {new:true}).populate("subSection").exec();
      // console.log("New Section is ",newSection);
       //fetch the update course and return to frontend
       const updatedCourse = await Course.findById(courseId).
                                          populate({
                                            path:"courseContents",
                                            populate:"subSection"
                                          }).exec();
       return res.status(200).json({
        success:true,
        message:"Section Updated Successfully ",
        updatedCourse
      })
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Section updation failed ",
        })
    }
}


//deleteSection details

exports.deleteSection = async (req,res) =>{
    try{
        const { sectionId, courseId } = req.body
        await Course.findByIdAndUpdate(courseId, {
          $pull: {
            courseContents: sectionId,
          },
        })
        const section = await Section.findById(sectionId)
      //  console.log(sectionId, courseId)
        if (!section) {
          return res.status(404).json({
            success: false,
            message: "Section not found",
          })
        }
        // Delete the associated subsections
        await subSection.deleteMany({ _id: { $in: section.subSection } })
    
        await Section.findByIdAndDelete(sectionId)
    
        // find the updated course and return it
        const updatedCourse = await Course.findById(courseId)
          .populate({
            path: "courseContents",
            populate: {
              path: "subSection",
            },
          })
          .exec();

       //   console.log(updatedCourse);
    // const updated= await Course.findById(courseId);
       return res.status(200).json({
        success:true,
        message:"Section deleted Successfully ",
        updatedCourse:updatedCourse
       // updated
      })
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Section deleted failed ",
        })
    }
}
