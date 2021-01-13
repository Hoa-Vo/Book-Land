let OKpassword = false;
let OKrepassword = false;
window.onload = function(){
    console.log("Inside onload");
    OKpassword = false; 
    OKrepassword = false;
    updateStatusResetButton();
}
;

let updateStatusResetButton = () => 
{
    let buttonElement = document.getElementById("resetButton");
  let valueSet = !( OKpassword && OKrepassword); 
  console.log(valueSet);
  buttonElement.disabled = valueSet;
  if(valueSet)
  {
    buttonElement.style = "background-color: black";
  }
  else{
    buttonElement.style = "background-color: red";
  }
}

function validatePassword()
{
    console.log("Inside valide password");
    const newPassword = document.getElementById("newpassword-box").value ;
    const rePassword = document.getElementById("repassword-box").value ;
    let notifyElement = document.getElementById("passwordcheck-notify"); 
    if(newPassword == "" )
    {
        OKpassword = false;
        updateStatusResetButton();
        notifyElement.innerHTML = "&#10005 Mật khẩu không được để trống";
        notifyElement.style = "color:red "; 
    }
    else if(newPassword.length < 8)
    {
        OKpassword = false;
        updateStatusResetButton();
        notifyElement.innerHTML = "&#10005 Mật khẩu phải dài ít nhất 8 kí tự !";
        notifyElement.style = "color:red "; 
    }
    else{
        validateRepassword();
        notifyElement.innerHTML = "";
        OKpassword = true; 
        console.log("Set okpassword = true")
        updateStatusResetButton();
    }
}

function validateRepassword()
{
    const rePassword = document.getElementById("repassword-box").value ;
    const notifyElement = document.getElementById("repasswordcheck-notify"); 
    const newPassword = document.getElementById("newpassword-box").value ;
    if(newPassword === rePassword && newPassword != "")
    {
        notifyElement.innerHTML = "&#10003";
        notifyElement.style = "color:#006400 "; 
        OKrepassword = true; 
        updateStatusResetButton();
    }
    else
    {
        notifyElement.innerHTML = "&#10005 Phải trùng với mật khẩu";
        notifyElement.style = "color:red "; 
        OKrepassword = false;
        updateStatusResetButton(); 
    }

    
}

function checkCorrectOldPassword()
{
    const input = document.getElementById("oldpassword-box");
    
    return false;
}

function changePassword()
{
   let checkOldPasswordResult = checkCorrectOldPassword(); 
   let newPassword = document.getElementById("newpassword-box").value; 

   let notifyElement = document.getElementById("repasswordcheck-notify"); 

   if(!checkOldPasswordResult)
   {
        notifyElement.innerHTML = "Mật khẩu hiện tại bạn nhập sai!";
        notifyElement.style = "color: red";
   }
   else{
       // send change password
    $.ajax(
        {
            url: document.URL,
            type: "POST",
            data: {
                newPassword : newPassword
            },
 
            statusCode: 
            {
             404: function () {
                 console.log("not OK");
             },
             202: function (result)
             {
                 console.log(result); 
                 if(result)
                 {
                     const notifyElement = document.getElementById("repasswordcheck-notify"); 
                             notifyElement.innerHTML = "Đã đổi mật khẩu của bạn sẽ, redirect bạn lại trang chủ";
 
                             setTimeout(function () {
                                 window.location.replace("/login");
                                 }
                             , 2000);
                             
 
                             console.log("OK");
                 }
             }
            }
        }
    )
   }

   
   
}

function resetNewPassword()
{
    console.log(document.URL);
    // send to api
    console.log(document.getElementById("newpassword-box").value);
    $.ajax(
        {
           
            url: document.URL,
            type: "POST",
            data: {
                newpassword: document.getElementById("newpassword-box").value, 
            },

            statusCode: {
                404: function () {
                    console.log("not OK");
                },
                202: function (result)
                {
                    console.log(result); 
                        if(result)
                        {
                            const notifyElement = document.getElementById("repasswordcheck-notify"); 
                            notifyElement.innerHTML = "Đã đổi mật khẩu của bạn sẽ, redirect bạn lại trang đăng nhập"

                            setTimeout(function () {
                                window.location.replace("/login");
                                }
                            , 2000);
                            

                            console.log("OK");
                        }
                }
            }
        }
    )

    
}