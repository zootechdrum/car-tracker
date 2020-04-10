require('dotenv').config()
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { Sequelize } = require('sequelize');


//Uses dotenv npm package to hide pw and user info
const db = new Sequelize('carTracker', process.env.DB_USER, process.env.DB_PASS ,
  {
  host:'localhost',
  dialect:'mysql'
});

  //Test DB
  //Checks if db can successfully connect
  db.authenticate()
    .then(() => console.log('Database connected ...'))
    .catch(err => console.log("Error " + err))
  

const app = express();

app.get('/', (req,res) => res.send("index"))

//Init server to port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))