require('./config/config');

var { mongoose } = require('./mongoose/mongoose');
var User = require('./model/user');
var port = process.env.PORT;

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');

var app = express();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('hi');
});


app.post('/signup', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(401).send(err);
    });
});

app.post('/login',(req,res)=>{
  var body=_.pick(req.body, ['email','password']);

  User.findByCredentials(body.email, body.password)
  .then(user=>{
    return user.generateAuthToken().then(token=>{
      res.header('x-auth',token).send(user);
    })
  })
  .catch(err=>{
    res.status(401).send(err);
  })
});

app.listen(port,()=>{
  console.log(`Server is running on ${port}`);
});