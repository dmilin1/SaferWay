const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');

const port = 3001;

function launchServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(pino);

  app.listen(port, () =>
    console.log('Express server is running on localhost:3001')
  );
}

mongoose.connect('mongodb://localhost/saferway');

var db = mongoose.connection;

db.on('error', function () {
  console.log('Failed to connect to database')
  launchServer()
});

db.once('open', function () {
   console.log('Connected to database');
   launchServer()
});
