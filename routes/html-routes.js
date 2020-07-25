// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("member");
    }
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    console.log(req.user);
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("member");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    db.Car.findAll({
      where: {
        userId: req.user.id,
      },
    }).then(function (dbCar) {
      if (dbCar[0]) {
        res.render("member", dbCar[0].dataValues);
      } else {
        res.render("member", { nocar: "You have not added any cars" });
      }
    });
  });
};
