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

exports.checkExistCategoryName = async (categoryName) => 
{
    const categoriesCollection = await db().collection("Category"); 
    const found = await categoryCollection.findOne({name: categoryName}); 

    if(found!= null && found!= undefined)
    {
        return true;
    }
    return false;
}

exports.addNewCategory = async (categoryName) => 
{
    const categoriesCollection = await db().collection("Category"); 
    const newInserted = await categoriesCollection.inserOne({
        name: categoryName
    });

    return newInserted.insertedId;
}