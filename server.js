var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var index = require('./router/index');
var assign = require('./router/assignments');


var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', index);
app.use('/assignments', assign);

var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port', port);
})
