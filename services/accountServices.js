const accountModel = require("../models/accountModel");
const smtpTransport = require("nodemailer-smtp-transport");
const nodemailer = require("nodemailer");
const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv/config");


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
  sendEmail(user.email, "[No-reply] Bookland: lấy lại mật khẩu của bạn", `<p> Vào liên kết sau để reset mật khẩu cho tài khoản ${user.name}của bạn: 
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
