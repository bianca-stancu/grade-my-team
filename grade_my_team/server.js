
var express = require("express");
const bodyParser = require('body-parser');
var User = require('./models/User');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Db
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dsproject');

var __dirname = process.cwd();


app.get('/',function(req,res){
    // res.sendFile(__dirname + '/client/login.html');
    res.sendFile(__dirname + '/client/login.html');
});

app.post("/adduser",function (req, res){
    var myData = new User(req.body);
    myData.save().then(function(item,bla){
        console.log("User successfluly saved to database");
    });
    res.sendFile(__dirname + '/client/main.html');
});

app.post("/login",function (req, res){
    User.find({
        username: req.body.username,
        password: req.body.password
    }).then(function(item,err){
        if (err) {
            console.log("AN ERROR OCCURED");
        } else {
            // console.log("found " + item);
            // console.log(item.length)
            if(item.length == 1){
                res.sendFile(__dirname + '/client/main.html');
            }
        }
    });
});

app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/client/signup.html');
});

app.listen(3000);
console.log("Running at Port 3000");

module.exports = app;
