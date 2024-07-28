const express = require("express");
const router = express.Router();

const {
    updateProfile,deleteProfile,getUserDetails,
    updateProfilePhoto
    } = require("../controllers/Profile");

   const {auth} = require("../middlewares/auth");
   
    router.delete("/deleteProfile", auth, deleteProfile);
    router.put("/updateProfile", auth, updateProfile);
    router.put("/updateProfilePicture", auth, updateProfilePhoto);
    router.get("/getUserDetails",auth,getUserDetails);

module.exports =router;