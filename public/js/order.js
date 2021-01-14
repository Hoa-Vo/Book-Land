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
  if (data.length < 1) {
    $(".orders").html("<div class='empty-order'><p>Không có đơn hàng nào</p></div>");
    $(".loader").css("display", "none");
  } else {
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
    $(".loader").css("display", "none");
  }
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

function getTransportingOrder() {
  $(".loader").css("display", "flex");
  $.ajax({
    type: "GET",
    url: "/api/order/transporting",
    data: {
      userID: userID,
    },
    success: function (res) {
      console.log(res);
      updateOrderHtml(res);
    },
  });
}

function getTransportedOrder() {
  $(".loader").css("display", "flex");
  $.ajax({
    type: "GET",
    url: "/api/order/transported",
    data: {
      userID: userID,
    },
    success: function (res) {
      console.log(res);
      updateOrderHtml(res);
    },
  });
}

function getCanceledOrder() {
  $(".loader").css("display", "flex");
  $.ajax({
    type: "GET",
    url: "/api/order/canceled",
    data: {
      userID: userID,
    },
    success: function (res) {
      console.log(res);
      updateOrderHtml(res);
    },
  });
}

function getAllOrder() {
  $(".loader").css("display", "flex");
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
}

function addCheckout() {
  const booksId = document.querySelectorAll(".item-id");
  for (const id of booksId) {
    addBookToUserCart(id.textContent);
  }
  window.location.href = "/checkout";
}
