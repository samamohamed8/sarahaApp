import nodemailer from "nodemailer";
export const sendEmail=async(to , subject , html , attachments)=>{
 const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
     user: process.env.MY_EMAIL,
     pass: process.env.PASSWORD_APP,
   },
   tls: {
     rejectUnauthorized: false,
   },
 });
 
 // Send an email using async/await

   const info = await transporter.sendMail({
     from: `"her our logo"<${ process.env.MY_EMAIL}>`,
     to: to? to :"saraahmedk71@gmail.com",
     subject: subject ? subject : "Hello ✔",
    
     html: html ?html : "<b>Hello world?</b>", // HTML version of the message
     attachments: attachments? attachments :[

     ]
   });
 
//    console.log("Message sent:", info.messageId);
if (info.accepted.length){
    return true
}else{
    false
}
}