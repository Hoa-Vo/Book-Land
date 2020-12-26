const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt"); 


// get user by ID
exports.getUserById = async id => {
    const userCollection = await db().collection("registeredUser");
    const user = await userCollection.findOne({ _id: ObjectID(id) });
    return user;
};
// list all user
exports.listAll = async () => 
{
    const userCollection = await db().collection("registeredUser");
    const users = await userCollection.find({}).toArray();
    return users; 
}

// try register
exports.addNewUser = async function(newUsername,plainNewPassword,newEmail)
{
    const userCollection = await db().collection("registeredUser");
    const userpasswordCollecton = await db().collection("User-hashPassword");
    let newPassword; 
    
    console.log(newPassword);
    await userCollection.insertOne({name: newUsername, age: 10,email: newEmail}, (err,item) => 
    {
        if(err)
        {
            console.log(err); 
        }
       
        bcrypt.hash(plainNewPassword,3,(err,hashResult) => 
        {
            userpasswordCollecton.insertOne({_id: item.insertedId, password: hashResult});
        })
    });
    
   
   
    return true;
};



