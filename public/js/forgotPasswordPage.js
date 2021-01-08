

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
                        if(result)
                        {
                            console.log("Received true");
                            notifyElement.innerHTML = "&#10003 Đã gửi email, kiểm tra email đăng kí của bạn";
                            notifyElement.style = "color: #006400";  
                        }
                        else{
                            notifyElement.innerHTML = "&#10005 Không tìm thấy username hay email này!";
                            notifyElement.style = "color: red"; 
                            console.log("Received false");
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