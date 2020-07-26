var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/project", function (req, res) {
    db.Project.create(req.body).then(function (projData) {
      console.log(projData);
    });
  });

  app.get("/api/project/:id", function (req, res) {
    db.Project.findAll({
      where: {
        CarId: req.params.id,
      },
    }).then(function (dbCar) {
      console.log(dbCar);
    });
  });
};
