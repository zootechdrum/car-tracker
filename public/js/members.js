$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    // console.groupCollapsed(data);
    $(".member-name").text(data.email);
    $("#carForm").data("data", data.id);
  });

  function getCars() {
    $.get("/api/car").then(function (data) {
      if (data.length !== 0) {
        console.log(data);
        addRow(data);
      }
    });
  }

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
      location.reload("/members");
    });
  }

  function addRow(carData) {
    carData.forEach((car) => {
      let tRow = $("<tr></tr>");

      let nextRowNumber;
      let lastRowNumber = $("#car-table tr:last th:first ").text();

      if (lastRowNumber === "#") {
        nextRowNumber = 1;
      } else {
        parseInt(lastRowNumber++);

        nextRowNumber = lastRowNumber++;
      }

      const th = $("<th scope='row'>" + nextRowNumber + "</th>");
      const tdMake = $("<td>" + car.make + "</td>");
      const tdModel = $("<td>" + car.model + "</td>");
      const tdYear = $("<td>" + car.year + "</td>");
      const button = $(
        "<td><button type='button' class='btn table-btn btn-primary'>Select</button></td>"
      ).data({
        make: car.make,
        model: car.model,
        year: car.year,
      });

      tRow.append(th);
      tRow.append(tdMake);
      tRow.append(tdModel);
      tRow.append(tdYear);
      tRow.append(button);

      $("tbody:last").append(tRow);
    });
  }

  getCars();
});
