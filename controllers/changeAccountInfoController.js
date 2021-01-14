
const accountService = require("../services/accountServices"); 
const accountModel = require("../models/accountModel");
const formidable = require("formidable");


exports.renderChangeAccountInfoPage = async (req,res,next) =>   
{
    if(req.user)
    {
        const userToShow = await accountModel.getUserById(req.user._id);
        res.render("userAccount/changeInformation", {userToShow: userToShow}); 
    }
    else{
        res.redirect("/login");
    }
}

exports.changeAccountInfo = async (req,res,next) => 
{
    if(req.user)
    {
        const form = formidable.IncomingForm();
        await form.parse(req, (err,fields, files) => 
        {
            let accountObject = {
                id: req.user._id, 
                email: fields.emailInput,
                age: fields.ageInput,
                address_city: fields.address_cityInput,
                address_district: fields.address_districtInput,
                address: fields.addressInput
                
            }

            accountModel.changeAccountInfo(accountObject).then(result => {
               res.status(202).send(result);
            });
        });
    }
}