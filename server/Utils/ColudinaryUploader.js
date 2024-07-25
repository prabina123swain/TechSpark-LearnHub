// this utility helps in uploading images to cloudinary 

const { extractPublicId } = require("cloudinary-build-url");

const cloudinary=require("cloudinary").v2;

exports.uploadToCloudinary = async(file,folder,height,width,quality)=>{
    //create options 
    const options={folder};
    if(height){
        options.height=height;
    }
    if(width){
        options.width=width;
    }
    if(height){
        options.quality=quality;
    }
    options.resource_type="auto";
    //tempFile path for creating a temporary file in server and 
    //after upload successfully it will delete from server
    try{
       const result=  await cloudinary.uploader.upload(file.tempFilePath,options); 
      // console.log("upload to cloudinary result ",result);
       return result;
     }
     catch(err){
        console.log("Error in uploading to cloudinary ",err.message);
     }
}

exports.DeleteFromcloudinary = async(url,folder,fileType)=>{
    const public_id = extractPublicId(url);
    //console.log(public_id);
    const {options}=folder;
    //options.resource_type="video";
   try{
   const result= await cloudinary.uploader.destroy(public_id,{folder:folder, secure: true, resource_type: `${fileType}` });
  // console.log("file deleted result ",result);
    return result;
   }
   catch(e){
    console.log("Error in deleting file from  cloudinary ",e.message);
   }
}