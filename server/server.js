const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');

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


function launchServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(pino);

  app.listen(port, () =>
    console.log('Express server is running on localhost:' + port)
  );

  app.get('/api/getAllProducts', function (req, res) {
    Product.find({}).exec(function(err, products){
      res.send(products);
    });
  })

}

mongoose.connect('mongodb://localhost/saferway', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', function () {
  console.log('Failed to connect to database')
  launchServer()
});

db.once('open', function () {
   console.log('Connected to database');
   launchServer()
});




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

var userIds = new mongoose.Schema({
  userID: Number,
  name: String,
});
var UserId = mongoose.model('UserId', userIds);




var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //console.log("connected")
//   // we're connected!



    //Working. Searches products list
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

    //FIX!!!
    function sortProducts(parameter, order) {
      var Product = mongoose.model('products',products);
      Product.find().sort({parameter: order}).exec(function(err,result)
      {
        if(result)
        {
          /*
          for(var i=0;i<result.length;i++)
          {
            console.log(result[i].name);
          }
          */
         console.log(result);
        }
      })
    }
    //sortProducts('name',1);
    //sortProducts('name',-1);

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
          var id;
          var query = { name: "null" }
          UserId.findOne(query, function(err, result) {
             if (err) throw err;
             if (result) {
               id = result.userID + 1;
               UserId.findOneAndUpdate({name: "null"}, {$set:{userID : id}}, function(err, doc) {
                 if (err) return console.error(err);
               })
               var temp = new Login({
                firstName: firstName,
                lastName: lastName,
                password: password,
                email: email,
                address: address,
                cartId: id,
               })
               temp.save(function (err, temp) {
                if (err) return console.error(err);
               });
               var Cart = mongoose.model( String(id), cart);
               return true;
             }
             else {
               console.log("Error");
               return false;
             }
          });
        }
        else {
          console.log("User already in Database");
        }
      }
    }

    //Working
    function searchCategory(cat) {
      db.collection('products').find( { category: { $eq: cat} }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
      });
    }
    //searchCategory("Vegetable");

    //Working
    function getCart(id, callback) {
      var Cart = mongoose.model( String(id), cart);
      Cart.find(function(err, result) {
        if (err) throw err;
        if (result) {
          callback(result);
          return true;
        }
        else {
          callback("false");
          //console.log("Cart not found");
          return false;
        }
     });
    }

    //Working
    function cartTotal(id) {
      var total = 0;
      getCart(id, sum);
      function sum(result) {
        if (result === "false") {
            console.log("Cart not found");
            return;
        }
        else {
          for(var i=0;i<result.length;i++)
          {
              total = total + result[i].price;
          }
          total = (total * 1.0925).toFixed(2);
          console.log("$" + total);
          return total;
        }
      }
    }
    //cartTotal(3);

    //Working
    function addCart(productName, price, category, aisle, size, amount, picPath, id) {
      getCart(id, updateCart);
      function updateCart(result) {
        if (result == "false") {
            console.log("Cart not found");
        }
        else {
          var query = { name: productName };
          result.findOne(query, function(err, found) {
            if (err) throw err;
            if (found) {
              var quantity = found.inventoryCount + amount;
              result.findOneAndUpdate({ name: productName}, {$set:{inventoryCount : quantity}}, function(err, doc) {
                if (err) return console.error(err);
              })
              return true;
            }
            else {
              var temp = new result({
                name: productName,
                price: price,
                category: category,
                aisle: aisle,
                size: size,
                inventoryCount: amount,
                picPath: picPath,
              })
              temp.save(function (err, temp) {
                if (err) return console.error(err);
              });
              return false;
            }
          });
        }
      }
    }

    //Working
    function removeCart(productName, id) {
      getCart(id, deleteFromCart);
      function deleteFromCart(result) {
        if (result == "false") {
          console.log("Cart not found");
        }
        else {
          result.findOneAndDelete({name : productName}, function(err, doc) {
            if (err) return console.error(err);
          })
        }
      }
    }


    //Working but can be improved
    function updatePassword(email, newPassword) {
       Login.findOneAndUpdate({email: email}, {$set:{password: newPassword}}, function(err, doc) {
         if (err) return console.error(err);
       })
    }

    //Working
    function updateAddress(email, newAddress) {
       Login.findOneAndUpdate({email: email}, {$set:{address: newAddress}}, function(err, doc) {
         if (err) return console.error(err);
       })
    }

    //Working
    function updateEmail(email, newEmail) {
       Login.findOneAndUpdate({email: email}, {$set:{email: newEmail}}, function(err, doc) {
         if (err) return console.error(err);
       })
    }

    //Working
    function updateFirstName(email, newFirst) {
       Login.findOneAndUpdate({email: email}, {$set:{firstName: newFirst}}, function(err, doc) {
         if (err) return console.error(err);
       })
    }

    //Working
    function updateLastName(email, newLast) {
       Login.findOneAndUpdate({email: email}, {$set:{lastName: newLast}}, function(err, doc) {
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
    function updateAisle(productName, newAisle) {
       Product.findOneAndUpdate({name: productName}, {$set:{aisle: newAisle}}, function(err, doc) {
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
    /*
    insertProduct("Milk", 2.89, "Dairy", 1, "1 gallon", 100, "/⁨productPics⁩/milk.jpeg");
    insertProduct("Apple", 0.99, "Fruit", 2, "1", 100, "/⁨productPics⁩/apple.jpeg");
    insertProduct("Peanut Butter", 3.89, "Spreads", 3, "16 oz", 100, "/⁨productPics⁩/peanutButter.jpeg");
    insertProduct("Cookies", 4.49, "Snacks", 4, "16", 100, "/⁨productPics⁩/cookies.jpeg");
    insertProduct("Potato", 0.89, "Vegetable", 2, "1", 100, "/⁨productPics⁩/potato.jpeg");
    insertProduct("Lettuce", 1.29, "Vegetable", 2, "1", 100, "/⁨productPics⁩/lettuce.jpeg");
    insertProduct("Eggs", 3.59, "Deli", 1, "12 count", 100, "/⁨productPics⁩/eggs.jpeg");
    insertProduct("Bacon", 4.49, "Meat", 5, "8 pieces", 100, "/⁨productPics⁩/bacon.png");
    insertProduct("Banana", 0.19, "Fruit", 2, "1", 100, "/⁨productPics⁩/banana.jpeg");
    insertProduct("Bounty Paper Towels", 5.99, "Cleaning", 6, "12 count", 100, "/⁨productPics⁩/bounty.jpeg");
    insertProduct("Brownies", 2.59, "Snacks", 4, "12 count", 100, "/⁨productPics⁩/brownies.jpg");
    insertProduct("Toilet Paper", 9.69, "Cleaning", 6, "24 rolls", 100, "/⁨productPics⁩/toiletPaper.jpg");
    insertProduct("Clorox Wipes", 2.99, "Cleaning", 1, "1", 100, "/⁨productPics⁩/clorox.jpeg");
    insertProduct("Coca Cola", 0.99, "Drinks", 7, "2 liter", 100, "/⁨productPics⁩/cocacola.png");
    insertProduct("Doritos", 1.99, "Snacks", 4, "1 Family Size", 100, "/⁨productPics⁩/doritos.jpg");
    insertProduct("Dreyers Chocolate Ice Cream", 3.59, "Frozen", 8, "1.5 qts", 100, "/⁨productPics⁩/dreyersChocolateIceCream.png");
    insertProduct("Dreyers Vanilla Ice Cream", 3.59, "Frozen", 8, "1.5 qts", 100, "/⁨productPics⁩/dreyersVanillaIceCream.png");
    insertProduct("Lays", 1.99, "Snacks", 4, "1 Family Size", 100, "/⁨productPics⁩/lays.jpg");
    insertProduct("Pepsi", 0.99, "Drinks", 7, "2 liter", 100, "/⁨productPics⁩/pepsi.jpg");
    insertProduct("Strawberries", 2.79, "Fruits", 2, "20 count", 100, "/⁨productPics⁩/strawberry.jpg");
    insertProduct("Apple Juice", 1.99, "Drinks", 7, "2 liter", 100, "/⁨productPics⁩/appleJuice.jpeg");
    insertProduct("Avocado", 1.99, "Fruit", 2, "1", 100, "/⁨productPics⁩/avocado.jpeg");
    insertProduct("Corona", 9.99, "Alcohol", 8, "12 Pack", 100, "/⁨productPics⁩/corona.jpeg");
    insertProduct("Crown Royal", 35.99, "Alcohol", 8, "1.75 Liter", 100, "/⁨productPics⁩/crownRoyal.jpg");
    insertProduct("Don Julio 1942", 129.99, "Alcohol", 8, "750 ml", 100, "/⁨productPics⁩/donJulio1942.jpg");
    insertProduct("Jameson", 45.89, "Alcohol", 8, "1.75 Liter", 100, "/⁨productPics⁩/jameson.jpg");
    insertProduct("Hersheys", 1.29, "Snacks", 4, "1.55 oz", 100, "/⁨productPics⁩/hersheys.jpg");
    insertProduct("Kit Kate", 1.29, "Snacks", 4, "1.5 oz", 100, "/⁨productPics⁩/kitkat.kpeg");
    insertProduct("Orange Juice", 1.99, "Drinks", 7, "2 liter", 100, "/⁨productPics⁩/orangeJuice.png");
    insertProduct("Oranges", 2.99, "Fruit", 2, "12 count", 100, "/⁨productPics⁩/oranges.jpg");
    insertProduct("Spinach", 1.99, "Vegetable", 2, "10 oz", 100, "/⁨productPics⁩/spinach.jpg");
    */

    //addUser("Bob", "Jackson", "password", "bob@gmail.com", "321 10th St. Santa Clara, CA 91123");
    //addUser("John", "Smith", "password", "test@yahoo.com", "123 1st St. San Jose, CA 95123");
    //addUser("James", "Johnson", "password", "johnson@hotmail.com", "987 2nd St. Sunnyvale, CA 94567");

    //addCart("Apple", 0.99, "Fruit", 2, "1", 2, "/⁨productPics⁩/apple.jpeg", 1);
    //addCart("Milk", 2.89, "Dairy", 1, "1 gallon", 2, "/⁨productPics⁩/milk.jpeg", 1);
    //removeCart("Milk", 2);

    //MOVE TO OUTSIDE db.once FUNCTION
  });
