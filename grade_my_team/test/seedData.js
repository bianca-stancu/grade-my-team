'use strict';

var mongoose = require('mongoose');
var User = require('../models/User');
var Course = require('../models/Course');

///////////////////////////////       Users       ////////////////////////////////////
var users = {
    name : 'User',
    data : [
        {
            "_id"            : new mongoose.Types.ObjectId(),
            "firstName"      : "Davide",
            "lastName"       : "Matteri",
            "username"       : "davidem",
            "password"       : "123",
            // "courses"        : ["Distributed systems","User experience design"],
            "role"           : "Student"
        },
        {
            "_id"            : new mongoose.Types.ObjectId(),
            "firstName"      : "Paolo",
            "lastName"       : "Rossi",
            "username"       : "paolor",
            "password"       : "234",
            // "courses"        : ["Distributed systems","Algorithms"],
            "role"           : "Student"
        },
        {
            "_id"            : new mongoose.Types.ObjectId(),
            "firstName"      : "Marco",
            "lastName"       : "Bianchi",
            "username"       : "marcob",
            "password"       : "345",
            // "courses"        : ["Algorithms"],
            "role"           : "Student"
        },
        {
            "_id"            : new mongoose.Types.ObjectId(),
            "firstName"      : "Fernando",
            "lastName"       : "Pedone",
            "username"       : "pedonep",
            "password"       : "abc",
            // "courses"        : ["Distributed systems"],
            "role"           : "Professor"
        },
        {
            "_id"            : new mongoose.Types.ObjectId(),
            "firstName"      : "Monica",
            "lastName"       : "Landoni",
            "username"       : "monical",
            "password"       : "bcd",
            // "courses"        : ["User experience design"],
            "role"           : "Professor"
        },
        {
            "_id"            : new mongoose.Types.ObjectId(),
            "firstName"      : "Antonio",
            "lastName"       : "Carzaniga",
            "username"       : "antonioc",
            "password"       : "cdf",
            // "courses"        : ["Algorithms"],
            "role"           : "Professor"
        }]
};



///////////////////////////////       Courses       ////////////////////////////////////
var courses = {
    name : "Course",
    data: [{
        "_id"            : new mongoose.Types.ObjectId(),
        "name"       : "Algorithms",
        "professorName"  : "Antonio Carzaniga",
        "students"   : []
    },
        {
            "_id"            : new mongoose.Types.ObjectId(),
            "name"       : "User experience design",
            "professorName"  : "Monica Landoni",
            "students"   : []
        },
        {
            "_id"            : new mongoose.Types.ObjectId(),
            "name"       : "Distributed systems",
            "professorName"  : "Fernando Pedone",
            "students"   : []
        }
    ]
};


var seedData = [];
seedData.push(users);
seedData.push(courses);

module.exports = seedData;