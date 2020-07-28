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
    }).then(function (dbProjects) {
      if (dbProjects[0]) {
        const projects = [];

        dbProjects.forEach((project) => {
          projects.push(project.dataValues);
        });

        res.json(projects);
      } else {
        res.json([]);
      }
    });
  });
};
