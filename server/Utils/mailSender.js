const nodemailer = require("nodemailer");

require("dotenv").config();

const mailSender= async (email,title,body)=>{
    console.log("Inside mail sender ",body);
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
     console.log("transporter created ");
    try {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "TechStack LearnHub",       // sender address
        to:` ${email}`,     // list of receivers
        subject: `${title}`,    // Subject line
        html: `${body}`, // html body
      });
     return info;
    }
    catch(err){
        console.log("error on Sending mail by transporter email OTP ",err);
    }
};

module.exports=mailSender;