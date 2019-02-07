var express = require('express');
var app = express();

var port = 3000;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.listen(port,()=>{
  console.log("listening at http://127.0.0.1:" + port);
});



// const mongoose = require('mongoose');
//
// mongoose.connect('mongodb://localhost/saferway');
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//
//   var products = new mongoose.Schema({
//     name: String,
//     price: Number,
//     updated: { type: Date, default: Date.now },
//   });
//
//   var Product = mongoose.model('Product', products);
//
//   var exampleProduct1 = new Product({
//     name: "Tomato",
//     price: 0.99,
//   })
//
//   exampleProduct1.save(function (err, exampleProduct1) {
//     if (err) return console.error(err);
//   });
//
// });
