const razprpay = require("razorpay");
require("dotenv").config();
//create an instance of razorpay

exports.instance = new razprpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})