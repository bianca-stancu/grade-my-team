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

var nameSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    username: { type: String},
    password: { type: String},
    courses: { type: Array, default:[]},
    role: {type: String}
});
var User = mongoose.model("User", nameSchema);

module.exports = User;