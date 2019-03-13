require('./config/config');

var { mongoose } = require('./mongoose/mongoose');
var User = require('./model/user');
var port = 3001;

const {authenticate} = require('./middleware/authenticate');
const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');

var app = express();

const port = 3001;
String.prototype.hashCode = function() {// gotten from stackoverflow
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}



app.post('/signup', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

mongoose.connect('mongodb://localhost/saferway', { useNewUrlParser: true });

app.post('/login',(req,res)=>{
  var body=_.pick(req.body, ['email','password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      user.generateAuthToken()
        .then(token => {
          res.header('x-auth', token).send(token);
        })
    })
    .catch(e => {
      res.status(400).send({ e: 'nah~' });
    })
});

app.delete('/users/token', authenticate, (req,res)=>{
  req.user.removeToken(req.token)
  .then((what)=>{
    res.send(what);
  })
  .catch(err=>{
    res.status(401).send("err");
  })
});

app.listen(port,()=>{
  console.log(`Server is running on ${port}`);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //console.log("connected")
//   // we're connected!

  var products = new mongoose.Schema({
    name: { type: String, unique: true },
    price: Number,
    category: String,
    aisle: Number,
    size: String,
    inventoryCount: Number,
    picPath: String,
    updated: { type: Date, default: Date.now },
  });
  var Product = mongoose.model('Product', products);

  var login = new mongoose.Schema({
     firstName: String,
     lastName: String,
     password: String,
     email: { type: String, unique: true },
     address: String,
     cartId: Number,
     cartSize: Number,
     updated: { type: Date, default: Date.now },
  });
  var Login = mongoose.model('Login', login);

  var cart = new mongoose.Schema({
    name: { type: String, unique: true },
    price: Number,
    category: String,
    aisle: Number,
    size: String,
    inventoryCount: Number,
    picPath: String,
    updated: { type: Date, default: Date.now },
  });

  //Working
  function search(findName, callback) {
    var query = { name: findName };
    Product.findOne(query, function(err, result) {
       if (err) throw err;
       if (result) {
         callback("true")
         return true;
       }
       else {
         callback("false")
         return false;
       }
    });
  }

  //Working
  function insertProduct(name, price, category, aisle, size, inventoryCount, picPath) {
      search(name, runAfterSearch);
      function runAfterSearch(result) {
        if (result == "false") {
          var temp = new Product({
             name: name,
             price: price,
             category: category,
             aisle: aisle,
             size: size,
             inventoryCount: inventoryCount,
             picPath: picPath,
          })
          temp.save(function (err, temp) {
             if (err) return console.error(err);
          });
        }
        else {
          console.log("Product already in Database");
        }
      }
  }

  //Working
  function searchLogin(findEmail, callback) {
    var query = { email: findEmail };
    Login.findOne(query, function(err, result) {
       if (err) throw err;
       if (result) {
         callback("true")
         return true;
       }
       else {
         callback("false")
         return false;
       }
    });
  }

  //Working
  function addUser(firstName, lastName, password, email, address) {
    searchLogin(email, newUser)
    function newUser(result) {
      if (result == "false") {
        var temp = new Login({
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
          address: address,
          cartId: String(email.hashCode()),
          cartSize: 0,
        })
        temp.save(function (err, temp) {
          if (err) return console.error(err);
        });
        var Cart = mongoose.model(String(email.hashCode()), cart);
      }
      else {
        console.log("User already in Database");
      }
    }
  }

  /*
  //Not working
  function searchCart(cartNumber, productName, callback) {
    var query = { name: productName };
    String(cartNumber).findOne(query, function(err, result) {
       if (err) throw err;
       if (result) {
         callback("true")
         return true;
       }
       else {
         callback("false")
         return false;
       }
    });
  }

  //NEXT TIME TRY TO INSERT RESULT FROM SEARCHING FOR AN ITEM
  //THIS METHOD IS FUCKED UP!!! FIX IT!!!
  function updateUserCart(userEmail, productName, quantity) {
    var query = { email: userEmail };
    var cart1;
    Login.findOne(query, function(err, result) {
       if (err) throw err;
       if (result) {
         cart1 = result.cartId;
         var Cart2 = mongoose.model(cart1,cart);
         //db.cart1.findOne();
         console.log(cart1);
         var q2 = { name: productName };
         db.findOne(cart1, function(err, result2) {
            if (err) throw err;
            if (result2) {
              return true;
            }
            else {
              return false;
            }
         });
         console.log("Cart found");
         return true;
       }
       else {
         console.log("Cart not found");
         return false;
       }
    });
  }
  */





  //Working but can be improved
  function updatePassword(email, newPassword) {
     Login.findOneAndUpdate({email: email}, {$set:{password: newPassword}}, function(err, doc) {
       if (err) return console.error(err);
     })
  }

  //Working
  function updatePrice(productName, newPrice) {
     Product.findOneAndUpdate({name: productName}, {$set:{price: newPrice}}, function(err, doc) {
       if (err) return console.error(err);
     })
  }

  //Working
  function updateSize(productName, newSize) {
     Product.findOneAndUpdate({name: productName}, {$set:{size: newSize}}, function(err, doc) {
       if (err) return console.error(err);
     })
  }

  //Working
  function updateCount(productName, newCount) {
     Product.findOneAndUpdate({name: productName}, {$set:{inventoryCount: newCount}}, function(err, doc) {
       if (err) return console.error(err);
     })
  }

  //Working
  function productSold(productName, quantity) {
    console.log("derp")
    var count;
    var query = { name: productName };
    Product.findOne(query, function(err, result) {
       if (err) throw err;
       if (result) {
         count = result.inventoryCount - quantity;
         Product.findOneAndUpdate({name: productName}, {$set:{inventoryCount : count}}, function(err, doc) {
           if (err) return console.error(err);
         })
         return true;
       }
       else {
         console.log("Product not found");
         return false;
       }
    });
  }

  //Working. Use this for Search bar
  function userSearch(input) {
    var query = { name: {$regex: '.*' + input + '.*', '$options' : 'i'} };
    Product.find(query, function(err, result) {
       if (err) throw err;
       if (result) {
         if(result == "") {
           console.log("No products found");
         }
         else {
           console.log(result);
         }
         return true;
       }
       else {
         return false;
       }
    });
  }

  //userSearch("ttt");

  insertProduct("Milk", 2.89, "Dairy", 1, "1 gallon", 100, "/⁨productPics⁩/milk.jpeg");
  insertProduct("Apple", 0.99, "Fruit", 2, "1", 100, "/⁨productPics⁩/apple.jpeg");
  insertProduct("Peanut Butter", 3.89, "Spreads", 3, "16 oz", 100, "/⁨productPics⁩/peanutButter.jpeg");
  insertProduct("Cookies", 4.49, "Snacks", 4, "16", 100, "/⁨productPics⁩/cookies.jpeg");
  insertProduct("Potato", 0.89, "Vegetable", 2, "1", 100, "/⁨productPics⁩/potato.jpeg");
  insertProduct("Lettuce", 1.29, "Vegetable", 2, "1", 100, "/⁨productPics⁩/lettuce.jpeg");
  insertProduct("Eggs", 3.59, "Deli", 1, "12 count", 100, "/⁨productPics⁩/eggs.jpeg");


  addUser("Bob", "Jackson", "password", "bob@gmail.com", "321 10th St. Santa Clara, CA 91123");
  addUser("John", "Smith", "password", "test@yahoo.com", "123 1st St. San Jose, CA 95123");
});
