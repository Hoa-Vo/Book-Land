$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/api/order",
    data: {
      userID: userID,
    },
    success: function (res) {
      console.log(res);
      updateOrderHtml(res);
    },
  });
});
function updateOrderHtml(data) {
  for (const element of data) {
    element.orderId = element.orderId.toUpperCase();
    const date = new Date(element.createDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    element.createDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }
  const source = $("#order-template").html();
  const template = Handlebars.compile(source);
  $(".orders").html(template(data));
}
