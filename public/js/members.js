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
      const tdforButtons = $("<td style='width:  30.00%'>");

      const buttonSelec = $(
        "<button type='button' class='btn btn-select table-btn btn-primary'>Select</button>"
      ).data({
        make: car.make,
        model: car.model,
        year: car.year,
      });
      const buttonDel = $(
        "<button type='button' class='btn table-btn btn-danger'>Delete</button>"
      ).data({
        id: car.id,
        make: car.make,
        model: car.model,
        year: car.year,
      });

      tdforButtons.append(buttonSelec);
      tdforButtons.append(buttonDel);
      tRow.append(th);
      tRow.append(tdMake);
      tRow.append(tdModel);
      tRow.append(tdYear);
      tRow.append(tdforButtons);

      $("tbody:last").append(tRow);
    });
  }

  $(document).on("click", ".btn-select", function () {
    const make = $(this).data("make");
    const model = $(this).data("model");
    const year = $(this).data("year");

    const selectDiv = $("#selected-car");
    selectDiv.empty();
    const h2 = $("<h2>Currently Selected Car : </h2>");
    const h3 = $(
      "<h3 class='selected-car-h3'><span class='selected-car'>" +
        make +
        " " +
        model +
        " " +
        year +
        "</span></h3>"
    );
    const input = $(
      "<div class='input-group mb-3'>" +
        "<input type='text' class='project-input form-control' placeholder='Add Project' aria-label='Project Name' aria-describedby='basic-addon2'>" +
        "<div class='input-group-append'>" +
        "<button type='submit' id='projectSbmt' class='btn btn-primary'>Submit</button> " +
        "</div> " +
        "</div>"
    );
    const button = $("");

    selectDiv.append(h2);
    selectDiv.append(h3);
    selectDiv.append(input);
    selectDiv.append(button);
  });

  $(document).on("click", "#projectSbmt", function () {
    console.log($(".project-input").val());
  });

  $(document).on("click", ".btn-danger", function () {
    const carId = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/car/" + carId,
    }).then(function (data) {
      location.reload("/members");
    });
  });

  getCars();
});
