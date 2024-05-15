const Tag = require("../models/Tag");

//Tag is created by admin  
exports.createTag= async(req,res) => {
    try{
    //take tag details from req body 
    const {name,description}=req.body;
    //data validation
    if(!name || !description){
        return res.status(500).json({
            success:false,
            message:"All fields are required", 
        })
    }
    //insert tag details to DB
    const tagDetails=await Tag.create({name,description});

    console.log("tag details ->",tagDetails);
    return res.status(200).json({
        success:true,
        message:"Tag created and inserter to DB successfully ",
        TagData:tagDetails
      })
    }
    catch(err){
        console.log("error in creating Tag ",err);
        return res.status(500).json({
            success:false,
            message:"Tag creation failed ",
        })
    }
}

exports.showAllTags =async(req,res) => {
    try{
    //Find all ta details whose name and description must present 
    const allTags=await Tag.find({},{name:true,description:true});
  
    console.log("All tags  ->\n",allTags);
    return res.status(200).json({
        success:true,
        message:"All tag details fetched successfully ",
        allTags
      })
    }
    catch(err){
        console.log("error in fetching all Tag ",err);
        return res.status(500).json({
            success:false,
            message:"Tag fetching failed ",
        })
    }
}