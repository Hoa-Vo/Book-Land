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
        res.status(202).send("notfound"); 
    }
    let userToSend;
    if(checkExistsEmail)
    {
        console.log("Found email"); 
         userToSend = await accountModel.getUserByEmail(information); 
    }
    else if(checkExistsUsername)
    {
        console.log("Found Username"); 
         userToSend = await accountModel.getUserByUsername(information); 
        
    }
    if(userToSend.isVerified == false)
    {
        res.status(202).send("notverified"); 
    }
    else{
        if(userToSend.isLocked == true)
        {
            res.status(202).send("locked");
        }
        else{
            accountServices.sendResetPasswordEmail(userToSend._id); 
            res.status(202).send("true"); 
        }
        
    }
   
    
}

