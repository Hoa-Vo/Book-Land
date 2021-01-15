const { db } = require("../database/db");
const { ObjectID } = require("mongodb");



exports.checkExistsCategoryID = async (categoryId) => 
{
    const categoryCollection = await db().collection("Category"); 
    
    // if exists category
    let exists = await categoryCollection.findOne({_id: ObjectID(categoryId)}); 

    if(exists == null || exists == undefined)
    {
        return false; 
    }
    return true;
}
