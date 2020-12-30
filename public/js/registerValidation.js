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
    url: "api/checkExistEmail/",
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
  console.log(document.getElementById("username-box").value);
  $.ajax({
    url: `api/checkExistedUsername/`,
    type: "GET",
    data: {
      name: name,
    },
    statusCode: {
      404: function () {},
      202: function (res) {
        console.log(res);
      },
    },
    error: function (jqXHR, textStatus, err) {
      console.log(err);
    },
  });
}
