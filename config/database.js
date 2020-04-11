const Sequelize = require('sequelize');

new Sequelize('carTracker', process.env.DB_USER, process.env.DB_PASS ,
  {
  host:'localhost',
  dialect:'mysql'
});