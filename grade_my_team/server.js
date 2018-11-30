
var express = require("express");
const bodyParser = require('body-parser');
var User = require('./models/User');
var Course = require('./models/Course');
var config = require('./config');
var app = express();
var session = require('express-session');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// Use the session middleware
app.use(session({
    secret: 'jaredasch',
    cookie: { maxAge: 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: false
}));

// Db
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUrl + config.mongoDbName);

var __dirname = process.cwd();
var currentUser;


app.get('/',function(req,res){
    return res.sendFile(__dirname + '/client/login.html');
});

app.post("/",function (req, res){

    // Create user
    if (req.body.firstName &&
        req.body.lastName &&
        req.body.username &&
        req.body.password &&
        req.body.role) {

        var myData = new User(req.body);
        myData.save().then(function (user, err) {
            if (user) {
                console.log("User successfluly saved to database");
                req.session.userId = user._id;
                return res.redirect('/profile');
            } else {
                throw new Error('An error occured.');
            }
        });
    }

    // Login
    else if((req.body.username && req.body.password)){
        User.authenticate(req.body.username, req.body.password, function (error, user) {
        if (error || !user) {
            throw new Error('Wrong email or password.');
        } else {
            req.session.userId = user._id;
            return res.redirect('/profile');
        }
        });
    }

});

app.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                }
                else{
                    currentUser = user;
                    res.sendFile(__dirname + '/client/main.html');
                }
            }
        });
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
    return res.redirect('/profile');
});

app.get("/getUser",function (req, res){
    res.json(currentUser)

});

app.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});



app.listen(3000);
console.log("Running at Port 3000");

module.exports = app;
