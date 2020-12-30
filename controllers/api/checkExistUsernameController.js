const acccountServices = require("../../services/accountServices"); 

exports.checkExistUsername = async (req,res,next) =>
{
    console.log("In check username controller");
    console.log(req.params.username); 
    let result = await acccountServices.checkExistsUsername(req.params.username);
    console.log("check username result: " +result);
    res.json({result});
    
    
}