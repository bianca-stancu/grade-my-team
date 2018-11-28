'use strict';

var mongoose = require('mongoose');
var User = require('../models/User');
var Course = require('../models/Course');

///////////////////////////////       Users       ////////////////////////////////////
var users = {
    name : 'User',
    data : [
        {
            "firstName"      : "Davide",
            "lastName"       : "Matteri",
            "username"       : "davidem",
            "password"       : "123",
            "courses"        : ["Distributed systems","User experience design"],
            "role"           : "Student"
        },
        {
            "firstName"      : "Paolo",
            "lastName"       : "Rossi",
            "username"       : "paolor",
            "password"       : "234",
            "courses"        : ["Distributed systems","Algorithms"],
            "role"           : "Student"
        },
        {
            "firstName"      : "Marco",
            "lastName"       : "Bianchi",
            "username"       : "marcob",
            "password"       : "345",
            "courses"        : ["Algorithms"],
            "role"           : "Student"
        },
        {
            "firstName"      : "Fernando",
            "lastName"       : "Pedone",
            "username"       : "pedonep",
            "password"       : "abc",
            "courses"        : ["Distributed systems"],
            "role"           : "Professor"
        },
        {
            "firstName"      : "Monica",
            "lastName"       : "Landoni",
            "username"       : "monical",
            "password"       : "bcd",
            "courses"        : ["User experience design"],
            "role"           : "Professor"
        },
        {
            "firstName"      : "Antonio",
            "lastName"       : "Carzaniga",
            "username"       : "antonioc",
            "password"       : "cdf",
            "courses"        : ["Algorithms"],
            "role"           : "Professor"
        }]
};



///////////////////////////////       Courses       ////////////////////////////////////
var courses = {
    name : "Course",
    data: [{
        "name"       : "Algorithms",
        "professor"  : "Antonio Carzaniga",
        "students"   : []
    },
        {
            "name"       : "User experience design",
            "professor"  : "Monica Landoni",
            "students"   : []
        },
        {
            "name"       : "Distributed systems",
            "professor"  : "Fernando Pedone",
            "students"   : []
        }
    ]
};


var seedData = [];
seedData.push(users);
seedData.push(courses);

module.exports = seedData;