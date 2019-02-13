const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;


var products = new mongoose.Schema({
  name: String,
  price: Number,
  updated: { type: Date, default: Date.now },
});

var Product = mongoose.model('Product', products);


function launchServer() {
  app.use(express.static(__dirname + '/public'));
  app.set('view engine', 'html');
  app.listen(port,()=>{
    console.log("listening at http://127.0.0.1:" + port);
  });
}


// an example function that returns data from the database
// in this case, it returns all "Products" with a "price" greater than 0.99
app.get('/test', function (req, res) {
    Product.find()
    .where('price').gt('0.99')
    .exec(function (err, data) {

      console.log(data)
      res.send(data)

    })
});



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
