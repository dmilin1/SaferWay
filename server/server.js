const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

var login = new mongoose.Schema({
  address: String,
  cartId: Number,
  updated: { type: Date, default: Date.now },
  address: {
   type: String,
   required: true
},
name: {
   type: String,
   trim: true,
   required: true
},
updated: { type: Date, default: Date.now },
email: {
   type: String,
   trim: true,
   required: true,
   unique: true,
   validate: {
       validator: (value => {
           return validator.isEmail(value);
       }),
       messsage: `Not a valid email address type`
   }
},
password: {
   type: String,
   trim: true,
   required: true,
   minlength: 6
},
tokens: [
   {
       token: {
           type: String,
           required: true
       },
       access: {
           type: String,
           required: true
       }
   }
],
history: []
});

login.pre('save', function(next){
 var user = this;

 if(user.isModified('password')){
     bcrypt.genSalt(10, (err,salt)=>{
         bcrypt.hash(user.password, salt, (err, hash)=>{
             if(hash){
                 user.password = hash;
             }
             next();
         })
     });
 } else{
     next();
 }
});
// User instance methods
login.methods.generateAuthToken = function() {
 var user = this;
 var access = 'auth';
 var token = jwt.sign({_id:user._id.toHexString(), access}, 'secretkey',
 {expiresIn: '1h'}).toString();
 user.tokens = user.tokens.concat ([{token,access}]);

 return user.save().then(()=>{
     return token;
 });
};

login.methods.toJSON = function(){
 var user = this;
 var userObject = user.toObject();
 return _.pick(userObject,['_id','email','password']);
}

// User static methods
login.statics.findByToken = function(token) {
 var User = this;
 var decoded;

 try{
     decoded = jwt.verify(token,'secretkey');
 } catch (err) {
     return Promise.reject(err);
 }

 return User.findById({_id:decoded._id});
};

login.statics.findByCredentials = function (email, password) {
 var User = this;

 return User.findOne({ email }).then((user) => {
     if (!user) {
         return Promise.reject();
     }

     return new Promise((resolve, reject) => {
         // Use bcrypt.compare to compare password and user.password
         bcrypt.compare(password, user.password, (err, res) => {
             if (res) {
                 resolve(user);
             } else {
                 reject();
             }
         });
     });
 });
};

login.methods.removeToken = function(token){
 var user = this;

 return user.update({
     $pull:{
         tokens:{token}
     }
 });
};

var Login = mongoose.model('Login', login);

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
  app.use(bodyParser.json());
  app.use(pino);
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
  app.post('/signup', (req, res) => {
    const body = _.pick(req.body, ['email', 'password','address','name']);
    if(body.address === undefined){
      body.address = 'address';
    }
    const user = new Login(body);
    user.save()
    .then(doc=>{
      res.send(doc);
    })
    .catch(err=>{
      res.status(404).send(err);
    })
  });

  //////LOGIN
  app.post('/login',(req,res)=>{
    var body=_.pick(req.body, ['email','password']);
    Login.findByCredentials(body.email, body.password)
      .then(user => {
        console.log(user);
        res.send(user);
      })
      .catch(e => {
        console.log(e);
        res.status(404).send({ e: 'nah~' });
      })
  });

  app.listen(port, () =>
    console.log('Express server is running on localhost:' + port)
  );

  app.get('/api/getAllProducts', function (req, res) {
    Product.find({}).exec(function(err, products){
      res.send(products);
    });
  })

  app.post('/api/getCart', function (req, res) {
    request = req.body;
    getCart(request.id, function(cart){
      res.send(cart);
    });
  })

  app.post('/api/setCart', function (req, res) {
    request = req.body;
    setCart(request.id, request.products, function(cart){
      res.send(cart);
    });
  })

  app.post('/api/getDetailedCart', function (req, res) {
    var cart = req.body.cart;
    if (cart && Object.keys(cart).length > 0) {
      var regex = '';
      for (var i = 0; i < Object.keys(cart).length; i++) {
        regex += '^' + Object.keys(cart)[i] + '$'
        if (i < Object.keys(cart).length - 1) {
          regex += '|'
        }
      }
      regex = new RegExp(regex);
      console.log(regex)
      Product.find({ name: { $regex: regex } }).exec((err, products) => {

        var returnData = [];
        console.log(cart)
        for (var i = 0; i < products.length; i++) {
          console.log(products[i].name)
          products[i]['count'] = cart[products[i].name].count;
          returnData.push({
            aisle: products[i]['aisle'],
            category: products[i]['category'],
            inventoryCount: products[i]['inventoryCount'],
            name: products[i]['name'],
            picPath: products[i]['picPath'],
            price: products[i]['price'],
            size: products[i]['size'],
            updated: products[i]['updated'],
            count: cart[products[i].name].count,
          })
        }

        console.log(returnData)

        res.send(returnData);
      });
    } else {
      res.send({})
    }
  });

  app.post('/api/getAccount', function (req, res) {
    id = req.body.id;

    Login.findById( id , (err, account) => {
      console.log(account);
      res.send({
        address: account.address,
        name: account.name,
      });
    });
  })

  app.post('/api/getHistory', function (req, res) {
    id = req.body.id;

    Login.findById( id , (err, account) => {
      res.send(account.history);
    });
  })

  app.post('/api/addToHistory', function (req, res) {
    id = req.body.id;
    cart = req.body.cart;

    Login.findById( id , (err, account) => {
      history = account.history;
      history.push(cart)
      console.log(history);
      Login.updateOne({ _id: id }, { history: history }, (err, result) => {
        if (err) throw err;
        res.send(history);
      });
    });
  })

  app.post('/api/getProductsSearch', function (req, res) {
    try {
      var searchStr = req.body.search.toLowerCase();
    } catch {}
    var category = req.body.category
    var aisle = req.body.aisle
    if (searchStr == '') { searchStr = undefined; }
    if (category == '') { category == null; }
    if (aisle == '') { aisle == null; }
    console.log(searchStr)
    Product.find({ 'name': { $regex: new RegExp('[' + searchStr + ']'), $options: 'i' } }).exec((err, products) => {
      console.log(products)
      if (searchStr) {
        products.sort((a,b) => {
          aScore = 0;
          for (var i = 0; i < a.name.length; i++) {
            aChar = a.name.toLowerCase().charAt(i);
            if (searchStr.includes(aChar)) {
              aScore += 1;
            } else {
              aScore -= 0.5;
            }
          }
          if (a.name.toLowerCase().includes(searchStr)) {
            aScore += 10;
          } else {
            aScore -= 0.5;
          }

          bScore = 0;
          for (var i = 0; i < b.name.length; i++) {
            bChar = b.name.toLowerCase().charAt(i);
            if (searchStr.includes(bChar)) {
              bScore += 1;
            } else {
              bScore -= 0.5;
            }
          }
          if (b.name.toLowerCase().includes(searchStr)) {
            bScore += 10;
          } else {
            bScore -= 0.5;
          }

          a['searchScore'] = aScore;
          b['searchScore'] = bScore;

          return bScore - aScore
        })
      }

      if (category) {
        products = products.filter(function(product) {
          return product.category.toLowerCase() == category.toLowerCase();
        })
      }

      if (aisle) {
        products = products.filter(function(product) {
          return product.aisle == aisle;
        })
      }

      console.log(products)

      res.send(products);
    });
  })


  //Working
  function getCart(id, callback) {
    Cart.findOne({ id: id }, function(err, result) {
      if (err) throw err;
      if (result) {
        console.log("cart exists")
        callback(result);
        return true;
      }
      else {
        //console.log("Cart not found");
        console.log("made new cart")
        var newCart = new Cart({
           id: id,
           products: {}
        })
        newCart.save((err, temp) => {
           if (err) return console.error(err);
           callback(newCart);
        });
        return false;
      }
   });
  }

  function setCart(id, cart, callback) {
    Cart.updateOne({ id: id }, { products: cart }, function(err, result) {
      if (err) throw err;
      console.log(result);
      callback(cart);
    });
  }

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



var carts = new mongoose.Schema({
  id: String,
  products: {},
});

var Cart = mongoose.model('Cart', carts);


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
      var query = { name: new RegExp('^'+findName+'$', "i")};
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

    //Working. Use 'asc' and 'desc' as order argument
    function sortProducts(attribute,order) {
      var Product = mongoose.model('products',products);
      Product.find().sort({ [attribute]: order }).exec(function(err,result)
      {
        if(result) {
          console.log(result);
        }
      });
    }
    //sortProducts('aisle','asc');

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
        return result;
      });
    }
    //searchCategory("Vegetable");



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

    //Working. Use this for Search bar. Leave fields blank if unused
    //input is text entered in search bar, cat is category is user selects;
    //attribute is attribute to sort by, order is 'asc' or 'desc'
    function userSearch(input,cat,attribute,order) {
      var query;
      if (cat === "") {
        query = { name: {$regex: '.*' + input + '.*', '$options' : 'i'}};
      }
      else {
        query = { name: {$regex: '.*' + input + '.*', '$options' : 'i'}, category: cat };
      }
      if(attribute === "") {
        attribute = 'name';
      }
      Product.find(query).sort({ [attribute] : order }).exec(function(err,result) {
         if (err) throw err;
         if (result) {
           if(result === "") {
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

    //userSearch("","","",'');
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
    insertProduct("Kit Kat", 1.29, "Snacks", 4, "1.5 oz", 100, "/⁨productPics⁩/kitkat.jpeg");
    insertProduct("Orange Juice", 1.99, "Drinks", 7, "2 liter", 100, "/⁨productPics⁩/orangeJuice.png");
    insertProduct("Oranges", 2.99, "Fruit", 2, "12 count", 100, "/⁨productPics⁩/oranges.jpg");
    insertProduct("Spinach", 1.99, "Vegetable", 2, "10 oz", 100, "/⁨productPics⁩/spinach.jpg");
    insertProduct("Cheese", 3.49, "Dairy", 1, "3 oz", 100, "/⁨productPics⁩/cheese.jpg");
    insertProduct("Jelly", 3.89, "Spreads", 3, "16 oz", 100, "/⁨productPics⁩/jelly.jpeg");
    insertProduct("Coca Cola", 0.99, "Drinks", 7, "2 liter", 100, "/⁨productPics⁩/cocacola.png");
    */
    insertProduct("Chicken", 15.49, "Meat", 5, "6 pieces", 100, "/⁨productPics⁩/chicken.jpg");
    insertProduct("Turkey", 4.59, "Deli", 1, "8 count", 100, "/⁨productPics⁩/turkey.jpeg");
    //addUser("Bob", "Jackson", "password", "bob@gmail.com", "321 10th St. Santa Clara, CA 91123");
    //addUser("John", "Smith", "password", "test@yahoo.com", "123 1st St. San Jose, CA 95123");
    //addUser("James", "Johnson", "password", "johnson@hotmail.com", "987 2nd St. Sunnyvale, CA 94567");

    //addCart("Apple", 0.99, "Fruit", 2, "1", 2, "/⁨productPics⁩/apple.jpeg", 1);
    //addCart("Milk", 2.89, "Dairy", 1, "1 gallon", 2, "/⁨productPics⁩/milk.jpeg", 1);
    //removeCart("Milk", 2);

    //MOVE TO OUTSIDE db.once FUNCTION
  });
