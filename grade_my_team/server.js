
var express = require("express");
const bodyParser = require('body-parser');
var User = require('./models/User');
var Course = require('./models/Course');
var config = require('./config');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Db
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/dsproject');
mongoose.connect(config.mongoUrl + config.mongoDbName);

var __dirname = process.cwd();
var currentUser = null;


app.get('/',function(req,res){
    return res.sendFile(__dirname + '/client/login.html');
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
                currentUser = item;
                console.log(currentUser)
                if(currentUser[0].role == 'Student'){
                    res.sendFile(__dirname + '/client/main.html');
                }
                else if(currentUser[0].role == 'Professor'){
                    res.sendFile(__dirname + '/client/mainProf.html');
                }

            }
            else{
                // alert("Username or Password is wrong. Please try again.");
                res.send(500,'showAlert');

            }
        }
    });
});

app.get('/login',function(req,res){
    if(currentUser != null && currentUser[0].role == 'Student'){
        res.sendFile(__dirname + '/client/main.html');
    }
    else if(currentUser != null && currentUser[0].role == 'Professor'){
        res.sendFile(__dirname + '/client/mainProf.html');
    }
});

app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/client/signup.html');
});

app.get("/newCourse",function (req, res){
    res.sendFile(__dirname + '/client/addCourse.html');
});

app.post("/addcourse",function (req, res){
    var myData = new Course(req.body);
    myData.save().then(function(item,bla){
        console.log("Course successfluly saved to database");
    });
    res.sendFile(__dirname + '/client/mainProf.html');
});

app.get("/seeAllCourses",function (req, res){
    console.log("-------------------")
    res.json(currentUser)

});



app.listen(3000);
console.log("Running at Port 3000");

module.exports = app;
