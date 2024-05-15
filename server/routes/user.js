const express = require("express");
const router = express.Router();

//import require controllers and middlewares

const {
    login, Signup, sendOTP, changPassword,
        } = require("../controllers/Auth");

const {
    resetPasswordToken, resetPassword
        } = require("../controllers/ResetPassword");

const {auth} = require("../middlewares/auth");

//preform login and signup routes

router.post("/login",login);
router.post("/signup",Signup);
router.post("/sendotp",sendOTP);
router.post("/changePassword",auth,changPassword);  //use auth middleware for change password

//routes for generate reset password token and reset password
router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password",resetPassword);

module.exports =router;