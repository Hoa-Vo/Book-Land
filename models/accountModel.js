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

// get user by username
exports.getUserByUsername = async name => 
{
    const userCollection = await db().collection("registeredUser");
    const user = await userCollection.findOne({ name: name}); 
    console.log(`Inside get user by name (model): ${user}`);
    return user;
}
// list all user
exports.listAll = async () => 
{
    const userCollection = await db().collection("registeredUser");
    const users = await userCollection.find({}).toArray();
    return users; 
}

// try add new user
exports.addNewUser = async function(newUsername,plainNewPassword,newEmail)
{
    const userCollection = await db().collection("registeredUser");
    const userpasswordCollecton = await db().collection("User-hashPassword");
    let newPassword; 
    console.log(newPassword);
    await userCollection.insertOne({name: newUsername, age: 10,email: newEmail, avatar_image: "notfound.jpg",isVerified: false}, (err,item) => 
    {
        if(err)
        {
            console.log(err); 
        }
        
       
        bcrypt.hash(plainNewPassword,3,(err,hashResult) => 
        {
            if(err)
            {
                console.log(`Hash error: ${err}}`); 
            }
            userpasswordCollecton.insertOne({_id: item.insertedId, password: hashResult});
        })
    });
    return true;
};

// toogle verify (to true)

exports.changeVerifyStatus = async (id, newVerifyStatus) => 
{
    const userCollection = await db().collection("registeredUser");
    await userCollection.updateOne(
        {"_id": ObjectID(id)},
        {$set: {"isVerified": newVerifyStatus}}
    );

}








