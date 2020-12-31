function checkCorrect() {
  return checkRepassword();
}

function checkRepassword() {
  const passwordString = document.getElementById("password-box").value;
  const repasswordString = document.getElementById("repassword-box").value;
  if (passwordString === repasswordString && passwordString != "") {
    return true;
  }
  return false;
}

function checkExistedEmail() {
  $.ajax({
    url: "api/checkExistEmail",
    type: "GET",
    data: document.getElementById("email-box").value,
    succcess: function (res) {
      console.log(res);
    },
    error: function (jqXHR, textStatus, err) {
      console.log(err);
    },
  });
  return true;
}
function checkExistedUsername() {
  console.log("Inside checkuser");
  const name = document.getElementById("username-box").value;
  $.ajax({
    url: `api/checkExistedUsername/`,
    type: "GET",
    data: {
      name: name,
    },
    statusCode: {
      404: function () {},
      202: function (res) {
        let notifyElement = document.getElementById("usercheck-notify"); 
        console.log(res);
        if(res)
        {
          notifyElement.innerHTML = "&#10060 Tên người dùng đã tồn tại, chọn tên khác";
          notifyElement.style = "color: red"; 
        }
        else{
          notifyElement.innerHTML = "&#9989 Bạn có thể dùng tên này";
          notifyElement.style = "color: #006400"; 
        }
      },
    },
    error: function (jqXHR, textStatus, err) {
      console.log(err);
    },
  });
}
