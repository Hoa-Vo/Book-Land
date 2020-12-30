
function checkCorrect()
{
    return checkRepassword();
}

function checkRepassword()
{
    const passwordString = document.getElementById("password-box").value; 
    const repasswordString = document.getElementById("repassword-box").value;
    if(passwordString === repasswordString && passwordString != "")
    {
        return true;
    }
    return false;
}

function checkExistedEmail()
{
    $.ajax({
        url: "api/checkExistEmail/",
        type: "GET",
        data: document.getElementById("email-box").value,
    
        succcess: function(result)
        {
            console.log(result);
        },
        error: function (jqXHR, textStatus, err) {},
    });
   return true; 
}
function checkExistedUsername()
{
    console.log("Inside checkuser");
    console.log(document.getElementById("username-box").value);
    $.ajax({
        url: `api/checkExistedUsername/${document.getElementById("username-box").value}`,
        type: "GET",
        data: document.getElementById("username-box").value,
    
        succcess: function(result)
        {
            console.log(result); 
        },
        error: function (jqXHR, textStatus, err) {
            console.log(err);
        },
    });
}

$(document).ready(() => {
    $.ajax({
        url: `api/checkExistedUsername/${document.getElementById("username-box").value}`,
        type: "GET",
        data: document.getElementById("username-box").value,
    
        succcess: function(result)
        {
            console.log(result); 
        },
        error: function (jqXHR, textStatus, err) {},
    });
});
