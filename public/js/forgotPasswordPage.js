

function resetPassword()
{
    let information = document.getElementById("usernameoremail-box").value;
    // send information to server
    $.ajax(
        {
            url: `api/forgotPassword/`,
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
                    }
                    else{
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