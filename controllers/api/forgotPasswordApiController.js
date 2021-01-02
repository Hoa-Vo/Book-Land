const accountServices = require("../../services/accountServices"); 
const accountModel = require("../../models/accountModel"); 

exports.handler = async (req,res,next) => 
{
    const information = req.query.information; 
    let checkExistsEmail = await accountServices.checkExistsEmail(information); 
    let checkExistsUsername = await accountServices.checkExistsUsername(information); 
    // both email and username dont exist
    if(! (checkExistsEmail || checkExistsUsername))
    {
        res.status(202).send(false); 
    }

    if(checkExistsEmail)
    {
        console.log("Found email"); 
        let userToSend = await accountModel.getUserByEmail(information); 
        accountServices.sendResetPasswordEmail(userToSend._id); 
    }
    else if(checkExistsUsername)
    {
        console.log("Found Username"); 
        let userToSend = await accountModel.getUserByUsername(information); 
        accountServices.sendResetPasswordEmail(userToSend._id); 
    }

    res.status(202).send(true); 
    
}