const accountModel = require("../models/accountModel");
const smtpTransport = require("nodemailer-smtp-transport");
const nodemailer = require("nodemailer");
const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv/config");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


function sendEmail(to,subject,content)
{
  let transport = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_NAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  );

  let mailOptions = {
    from: process.env.MAIL_NAME,
    to: to,
    subject: subject,
    html: content
  }
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent " + info.response);
    }
  });
}

exports.sendVerifyEmail = async userid => {

  const user = await accountModel.getUserById(userid);
  console.log(user);
  const emailToSend = user.email;
  const usernameToSend = user.name; 

  sendEmail(emailToSend,"[No reply] Xác nhận tài khoản BookLand của bạn",`<p> Xin hãy xác nhận tài khoản: ${usernameToSend} của bạn qua đường dẫn localhost:3000/verify/${userid}</p>`); 
};

exports.sendResetPasswordEmail = async userid => {
  const user = await accountModel.getUserById(userid); 
  console.log(`User to send reset password: ${user.name}`); 
  sendEmail(user.email, "[No-reply] Bookland: Lấy lại mật khẩu của bạn", `<p> Vào liên kết sau để reset mật khẩu cho tài khoản ${user.name}của bạn: 
  localhost:3000/forgotPassword/${userid} </p>`); 
}

exports.checkValidPassword = async (id, plainPassword) => {
  const userpasswordCollection = await db().collection("User-hashPassword");
  const foundUser = await userpasswordCollection.findOne({ _id: ObjectID(id) });
  console.log("hashed passs: ");
  console.log(foundUser.password);

  return bcrypt.compareSync(plainPassword, foundUser.password);
};

exports.registerNewuser = async (newUsername, plainNewPassword, newEmail) => {
  console.log(newUsername, plainNewPassword, newEmail);
  let res = await accountModel.addNewUser(newUsername, plainNewPassword, newEmail);
  console.log(res)
  //let newuser = await accountModel.getUserByUsername(newUsername);
  this.sendVerifyEmail(res);
};

exports.vefifyEmail = async id => {
  await accountModel.changeVerifyStatus(id, true);
};

exports.checkExistsUsername = async inputUsername => {
  let result = await accountModel.isExistsUsername(inputUsername);

  return result;
};

exports.checkExistsEmail = async inputEmail => 
{
  let result = await accountModel.isExistsEmail(inputEmail); 
  return result; 
}

exports.saveImageToCloud = async file => {
    const oldPath = file.userImage.path;
    let newImageLink; 
    await cloudinary.uploader.upload(oldPath,  (err,result) => {
      if(err){
        newImageLink = null;
      }
      else{
        newImageLink = result.url;
      }
      
    });
    return newImageLink;
}

exports.changeAccountInfomation = async accountObject => 
{
  let willResendVerifyEmail = false; 

  let user = await accountModel.getUserById(accountObject.id);
  if(user != undefined && user.email != accountObject.email)
  {
    willResendVerifyEmail = true;
  }
  let result = await accountModel.changeAccountInfo(accountObject); 
 
  // check and resend email 
  if(result)
  {
    if(willResendVerifyEmail)
    {
      accountModel.changeVerifyStatus(accountObject.id,false);
      this.sendVerifyEmail(accountObject.id); 
    }
  }

  return result; 
  
}


