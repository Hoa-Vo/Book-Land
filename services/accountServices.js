const accountModel = require("../models/accountModel"); 
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt"); 

exports.sendVerifyEmail = async userid => {

    let transport = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'bookland.hcmus@gmail.com', 
            pass: 'bookland@1234'
        }
    }));

    const user = await accountModel.getUserById(userid); 
    console.log(user);
    const emailToSend = user.email; 
    let mailOptions = {
        from: 'bookland.hcmus@gmail.com',
        to: emailToSend,
        subject: 'Test from Nodejs 2',
        html: `<p> Xin hãy xác nhận tài khoản của bạn qua đường dẫn <a href = "localhost:3000/verifyemail/${userid}">Link</a> <p>`
    }; 

    //console.log("Inside mail serviceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    transport.sendMail(mailOptions, (err,info)=>
    {
        if(err)
        {
          console.log(err);
        }
        else{
         console.log("Email sent " + info.response); 
        }
    }); 
}


exports.checkValidPassword = async (id, plainPassword) => 
{
    const userpasswordCollection = await db().collection("User-hashPassword");
    const foundUser = await userpasswordCollection.findOne({_id: ObjectID(id)}); 
    console.log("hashed passs: ") ; 
    console.log(foundUser.password); 

    return bcrypt.compareSync(plainPassword,foundUser.password); 
}

exports.registerNewuser = async (newUsername,plainNewPassword,newEmail) => 
{
    let res = await accountModel.addNewUser(newUsername,plainNewPassword,newEmail);
    let newuser = await accountModel.getUserByUsername(newUsername); 
    this.sendVerifyEmail(newuser._id);
    
}