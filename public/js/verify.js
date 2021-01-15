function verifyUser() {
  $.ajax({
    url: "/api/verify/",
    type: "POST",
    success: function (res) {},
    error: function (jqXHR, textStatus, err) {
      console.log(err);
    },
  });
}
