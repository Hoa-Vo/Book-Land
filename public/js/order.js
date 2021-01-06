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

function cancelOrder() {
  $(".loader").css("display", "flex");
  const orderId = window.location.href.split("/")[4].toLowerCase();
  $.ajax({
    type: "DELETE",
    url: "/api/order/del",
    data: {
      orderId: orderId,
    },
    success: function (res) {
      $(".loader").css("display", "none");
      if (res) {
        $("#cancel-div").html(
          `<a onclick="deleteOrder()" class="btn btn-default hvr-hover btn-cart">Xóa đơn hàng</a>`
        );

        $("#order-status").html("Đã hủy");
      } else {
        alert("Không thể hủy đơn hàng lúc này, vui lòng thử lại sau!!!");
      }
    },
  });
}
