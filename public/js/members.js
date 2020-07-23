$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    console.groupCollapsed(data);
    $(".member-name").text(data.email);
    $("#carForm").data("data", data.id);
  });

  $("#carFormSubmit").on("click", function (e) {
    e.preventDefault();
    car = {
      make: $("#makeForForm").val(),
      model: $("#modelForForm").val(),
      year: parseInt($("#yearForForm").val()),
      UserId: $("#carForm").data("data"),
    };

    submitCar(car);
  });

  function submitCar(car) {
    $.post("/api/car", car, function (data) {
      console.log(data);
    });
  }
});
