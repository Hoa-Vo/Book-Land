$(document).ready(() => {
  upDateCheckoutInfo();
});
function upDateCheckoutInfo() {
  pTagContent = $("#user-info").html();
  userID = pTagContent.split(">")[1].split("<")[0];
  $.ajax({
    url: "/api/get-cart/user",
    type: "GET",
    data: {
      userID: userID,
    },
    success: function (res) {
      updateCheckOutHtml(res);
    },
  });
}
function updateCheckOutHtml(books) {
  const source = $("#checkout-info").html();
  const template = Handlebars.compile(source);
  $("#info-list").html(template(books));
  let totalMoney = 0;
  for (let i = 0; i < books.length; i++) {
    totalMoney += books[i].totalPrice;
  }
  console.log(totalMoney);
  $("#total-money-pay").html(`${totalMoney} VND`);
  $("#money-pay").html(`${totalMoney} VND`);
}
