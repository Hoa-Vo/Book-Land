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

function resetNewPassword()
{
    console.log("Inside reset");

    

    
}