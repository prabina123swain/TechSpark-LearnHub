const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.connect =()=> { 
    cloudinary.config({ 
    cloud_name: `${process.env.CLOUD_NAME}`, 
    api_key: `${process.env.API_KEY}`, 
    api_secret: `${process.env.API_SECRET}`,
    secure: true
  })
  console.log("cloudinary connection successfully ")
}