const mongoose=require("mongoose");

const profileSchema=new mongoose.Schema({
    gender:{
        type:String,
        default:''
    },
    dateOfBirth:{
        type:String,
        default:''
    },
    about:{
        type:String,
        trim:true,
        default:''
    },
    contactNumber:{
       type:String,
       trim:true,
       default:''
    }
});

module.exports=mongoose.model("Profile",profileSchema);