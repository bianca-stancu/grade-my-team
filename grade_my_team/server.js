
var express = require("express");
var app     = express();
var bodyParser = require('body-parser');
var User = require('./models/User');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Db
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dsproject');


var __dirname = process.cwd();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var app = express();


app.get('/',function(req,res){
    // res.sendFile(__dirname + '/client/login.html');
    res.sendFile(__dirname + '/client/signup.html');
});

app.post("/adduser",function (req, res){
    var myData = new User(req.body);
        myData.save().then(function(item,bla){
        console.log("user saved to database");
    });
    res.sendFile(__dirname + '/client/main.html');
});


app.listen(3000);
console.log("Running at Port 3000");

module.exports = app;
