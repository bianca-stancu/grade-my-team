/** @module models/User
 * The User Model
 * Schema:
 * _id            ObjectId   required   Unique identifier of the track
 * firstname      String     required   Name
 * lastname       String     required   Surname
 * username       String     required   username
 * password       String     required   password
 * courses        Array      required   An array of the ids of the courses the user is enrolled in. Default: []
 * role           String     required    User role: Student/Professor
 */


'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var nameSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    username: { type: String},
    password: { type: String},
    courses: { type: Array, default:[]},
    assignments: {type: Array, default:[]},
    role: {type: String}
});

//authenticate input against database
nameSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username: username })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};

//hashing a password before saving it to the database
nameSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User = mongoose.model("User", nameSchema);

module.exports = User;