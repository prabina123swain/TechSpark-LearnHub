//send a eamil when a user will fill contact us details
const mailSender = require("../Utils/mailSender");

exports.contactUs = async(req,res) => {
    const {firstName,lastName,email,message} = req.body;
    try{
        //send email to admin 
        const adminMailed = await mailSender(`pradipswain304@gmail.com`,`Contact by user in TechStack LeranHub ${email}`,`Name - ${firstName} ${lastName} \n and message : ${message}`);
        const usermailed = await mailSender(`${email}`,"Query raised ",`<p></p> Your query raised our support team will reach out to you sortly </p> <br> <h2>Thank you<h2></h2>`);
        return res.status(200).json({
            success:true,
            message:"Meassage send successfully to both user and admin",
            adminMessage:adminMailed,
            userMessage:usermailed
          })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error in contact Us form",
          }) 
    }
}