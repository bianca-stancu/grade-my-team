
var express = require("express");
const bodyParser = require('body-parser');
var User = require('./models/User');
var Course = require('./models/Course');
var Homework = require('./models/Homework');
var config = require('./config');
var app = express();
var session = require('express-session');
var formidable = require('formidable');
var fs = require('fs');

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
var currentCourse;


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
        myData._id = new mongoose.Types.ObjectId();
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
    User.findById(req.session.userId).populate("courses").populate("assignments")
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

app.get('/signup', function (req, res,next) {
    res.sendFile(__dirname + '/client/signup.html');
});

app.get("/newCourse",function (req, res,next){
    res.sendFile(__dirname + '/client/addCourse.html');
});

app.post("/addcourse",function (req, res, next){
    //Check if course already exists
    Course.find({}, function(err, courses) {
        courses.forEach(function(course) {
            console.log(course.name)
            console.log(req.body.name)
            if(course.name == req.body.name){
                console.log("inside")
                var err = new Error('Not authorized! Course already exists! Go back!');
                err.status = 400;
                return next(err);
            }
        });
    });
    //Create course
    var myData = new Course(req.body);
    myData._id = new mongoose.Types.ObjectId();
    myData.save().then(function(item,bla){
        console.log("Course successfuly saved to database");
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

app.post('/fileupload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    var newpath;
    form.parse(req, function (err, fields, files) {
        var oldpath = files.my_file.path;
        newpath = __dirname + '/assignments/' + files.my_file.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            // Store file to MongoDb
            var fileData = fs.readFileSync(newpath);
            const hm = new Homework({
                type: 'text/plain',
                data: fileData,
                name: files.my_file.name,
                uploader: currentUser._id,
                course: currentCourse._id,
                graded: false
                // members:

            });
            hm.save().then(function (homework, err) {
                if (homework) {
                    console.log("Homework successfuly saved to database");
                    // console.log("homework._id " + homework._id);
                    //Add homework's id to the user's assignments
                    User.findOne({ username: currentUser.username }, function (err, user){
                        user.assignments.push(homework._id);
                        user.save();
                    });
                } else {
                    throw new Error('An error occured.');
                }
            });
            res.end();
        });
    });
    // To update currentUser
    User.findById(req.session.userId).populate("courses").populate("assignments")
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
                }
            }
        });

    return res.redirect('/courseView');
});

app.get('/enrollment', function (req, res, next) {
    res.sendFile(__dirname + '/client/enrollment.html');
});

app.get('/getAllCourses', function (req, res, next) {
    Course.find({}, function(err, courses) {
        var courseMap = [];
        courses.forEach(function(course) {
            courseMap.push(course.name);
        });
        res.json(courseMap);
    });
});

app.post('/enroll', function (req, res, next){
    Course.findOne({name: req.body.enrollCourse})
        .exec(function (error, course) {
            if (error) {
                return next(error);
            } else {
                User.findOne({username: currentUser.username})
                    .exec(function (error, user) {
                        if (error) {
                            return next(error);
                        } else {
                            if(user.courses.indexOf(course._id)!=-1){
                                var err = new Error('You are already enrolled in this course! Go back!');
                                err.status = 400;
                                return next(err);
                            }
                            user.courses.push(course._id);
                            user.save();
                        }
                    });
                course.students.push(currentUser._id);
                course.save();
            }
        });
    return res.redirect('/profile');
});

app.post('/unenroll', function (req, res, next){
    Course.findOne({name: req.body.unEnrollCourse})
        .exec(function (error, course) {
            if (error) {
                return next(error);
            } else {
                var index = course.students.indexOf(currentUser._id);
                if (index > -1) {
                    course.students.splice(index, 1);
                }
                else{
                    var err = new Error('Not authorized! You are not enrolled in this course! Go back!');
                    err.status = 400;
                    return next(err);
                }
                course.save();

                User.findOne({username: currentUser.username})
                    .exec(function (error, user) {
                        if (error) {
                            return next(error);
                        } else {
                            var index = user.courses.indexOf(course._id);
                            if (index > -1) {
                                user.courses.splice(index, 1);
                            }
                            user.save();
                        }
                    });
            }
        });
    return res.redirect('/profile');
});

app.post('/getCourseView',function(req,res){
    // console.log(req.body.courseName);
    // currentCourse = req.body.courseName;
    Course.findOne({ name: req.body.courseName }, function (err, course){
        currentCourse = course;
    });
    return res.redirect('/courseView');
});


app.get('/courseView',function(req,res){
    return res.sendFile(__dirname + '/client/course.html');
});

app.get("/getHomoworks",function (req, res){
    res.json([currentUser, currentCourse])

});


app.listen(3000);
console.log("Running at Port 3000");

module.exports = app;
