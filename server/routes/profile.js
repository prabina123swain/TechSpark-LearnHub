const express = require("express");
const router = express.Router();

const {
    updateProfile,deleteProfile,getUserDetails
    } = require("../controllers/Profile");

const {auth} = require("../middlewares/auth");
   
    router.delete("/deleteProfile", auth, deleteProfile);
    router.put("/updateProfile", auth, updateProfile);
    router.get("/getUserDetails",auth,getUserDetails);

module.exports =router;