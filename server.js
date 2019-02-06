var express = require('express');
var app = express();

var port = 3000;

app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'html');
app.listen(port,()=>{
  console.log("listening at http://127.0.0.1:" + port);
});
