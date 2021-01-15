
$(document).on("keypress", "form", function(e) {
    var code = e.keyCode || e.which;
    console.log(code);
    if (code == 13) {
        console.log('Inside');
        e.preventDefault();
        resetPassword();
        return false;}
});


function resetPassword()
{
    let notifyElement = document.getElementById("information-notify");
    let information = document.getElementById("usernameoremail-box").value;
    if(information != "")
    {
        // send information to server
        $.ajax(
            {
                url: `/api/forgotPassword/`,
                type: "GET",
                data: {
                    information: information
                }, 
    
                statusCode: {
                    404: function () {},
                    202: function (result)
                    {
                        console.log(result); 
                        if(result == "notfound")
                        {
                            

                            notifyElement.innerHTML = "&#10005 Không tìm thấy username hay email này!";
                            notifyElement.style = "color: red"; 
                            console.log("Received false");
                        }
                        else if(result == "true") {
                            console.log("Received true");
                            notifyElement.innerHTML = "&#10003 Đã gửi email, kiểm tra email đăng kí của bạn";
                            notifyElement.style = "color: #006400"; 
                        }
                        else if(result == "notverified"){
                            console.log("Received account not verified");
                            notifyElement.innerHTML = "&#10005 Tìm thấy tài khoản, nhưng tài khoản chưa được xác thực nên không thể dùng chức năng quên mật khẩu";
                            notifyElement.style = "color: red"; 
                        }
                        else
                        {
                            notifyElement.innerHTML = "&#10005 Tìm thấy tài khoản, nhưng tài khoản đã bị khoá!";
                            notifyElement.style = "color: red"; 
                        }
                    }
                },
                error: function (jqXHR, textStatus, err) {
                    console.log(err);
                  },
    
            }
        )
    }
    else{
        notifyElement.innerHTML = "&#10005 Không được để trống!";
        notifyElement.style = "color: red"; 
    }
    
    
}