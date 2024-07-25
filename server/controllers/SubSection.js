const SubSection=require("../models/SubSection");
const Course = require("../models/Course");
const Section=require("../models/Section");
const {uploadToCloudinary}=require("../Utils/ColudinaryUploader");
require("dotenv").config();

exports.createSubSection = async (req,res) =>{
    try{
        //fetch data
        const {
            title,
            description,
            sectionId
         }=req.body;
        //perform validation
        //console.log(title,description,sectionId)

        const video=req.files.video;
        // console.log(video);
        if(!title || !description || !sectionId || !video){
            return res.status(405).json({
                success:false,
                message:"Enter all the details of sub section",
              })
        }
       // console.log("video file",video);
        //insert video to cloudinary 
        const uploadedVideo= await uploadToCloudinary(video,process.env.FOLDER);
        //Insert SubSection details to Db
       //console.log("uploaded video",uploadedVideo);
        const SubSectionDetails=await SubSection.create({
            title,
            description,
            timeDuration: `${uploadedVideo.duration}`,
            videoUrl:uploadedVideo.secure_url
        })
      //  console.log("subsection details ",SubSectionDetails);
        //add SubSection to corresponding Section details
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
          ).populate("subSection");
        
      //  console.log("Updated section ",updatedSection);

        return res.status(200).json({
            success:true,
            message:"SubSection created Successfully ",
            updatedSection:updatedSection
          })
    }
    catch(err){
        console.log("error in creating subsection ",err.message);
        return res.status(500).json({
            success:false,
            message:"SubSection creation failed ",
        })
    }
}

//update SubSection 

exports.updateSubSection = async (req,res) =>{
    try{
        const {
            title,
            description,
            subSectionId,
            sectionId
         }=req.body;
        //perform validation
      //  console.log(title,sectionId,subSectionId,description);
        const oldSubSection= await SubSection.findById(subSectionId);

        if(!oldSubSection){
            return res.status(500).json({
                success:false,
                message:"No subSection found "
            })
        }
      
    if (title !== undefined) {
        oldSubSection.title = title
      }
  
    if (description !== undefined) {
        oldSubSection.description = description
      }
    
      if(req.files?.video!==undefined){
        const video=req.files.video;
        //delete the previous from cloudinary 
        
        //upload the video
        const uploadedVideo= await uploadToCloudinary(video,process.env.FOLDER);
        oldSubSection.videoUrl=uploadedVideo.secure_url;
        oldSubSection.timeDuration=`${uploadedVideo.duration}`;
      }
         
     const newSubSection = await oldSubSection.save();
    // console.log("new subsection ",newSubSection);
    //update SubSection details from Db
      const updatedSection = await Section.findById(sectionId).populate("subSection").exec();
      //console.log("New Section is ",this.updatedSection);
       
       return res.status(200).json({
        success:true,
        message:"SubSection Updated Successfully ",
        updatedSection
      })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"SubSection creation failed ",
        })
    }
}


//delete SubSection details

exports.deleteSubSection = async (req,res) =>{
    try{
        //Here we are retriving details from res parameter
        const {subSectionId,sectionId}=req.body;
        //perform validation
        if(!subSectionId){
            return res.status(405).json({
                success:false,
                message:"Enter all the details ",
              })
        }
        //update SubSection details to Db
      const updatedSection=await Section.findByIdAndUpdate(sectionId,{
            $pull:{subSection:subSectionId}
             },{new:true}).populate("subSection").exec();
       await SubSection.findByIdAndDelete(subSectionId);
       
       return res.status(200).json({
        success:true,
        message:"SubSection deleted Successfully ",
        updatedSection
      })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"SubSection deleted failed ",
        })
    }
}
