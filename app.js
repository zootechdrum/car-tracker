const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const { Sequelize } = require('sequelize');

const db = new Sequelize('car-tracker','root','password', {
  host:'localhost',
  dialect:'mysql'
});

  //Test DB
  db.authenticate()
    .then(() => console.log('Database connected ...'))
    .catch(err => console.log("Error " + err))
  

const app = express();

app.get('/', (req,res) => res.send("index"))

//Init server to port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))