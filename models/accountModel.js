const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");



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
exports.addNewUser = async function(newUsername,newPassword,newEmail)
{
    const userCollection = await db().collection("registeredUser");
    const userpasswordCollecton = await db().collection("User-hashPassword");
    let newID; 
    await userCollection.insertOne({name: newUsername, age: 10,email: newEmail}, (err,item) => 
    {
        if(err)
        {
            console.log(err); 
        }
        userpasswordCollecton.insertOne({_id: item.insertedId, password: newPassword});
    });
    
   
   
    return true;
};



