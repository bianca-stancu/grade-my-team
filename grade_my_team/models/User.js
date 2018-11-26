/** @module models/User
 * The User Model
 * Schema:
 * _id            ObjectId   required   Unique identifier of the track
 * firstname      String     required   Name
 * lastname       String     required   Surname
 * username       String     required   username
 * password       String     required   password
 * courses        Array      required   An array of the ids of the courses the user is enrolled in. Default: []
 * type           Int        required   Int indicating if the user is a student (0) or a professor (1).
 */


'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// /** @constructor
//  * @param {Object} definition
//  */
// var userSchema = new mongoose.Schema(
//
//     {
//
//         firstname : { type: String, required: true },
//         lastname : { type: ObjectId, ref:'Artist', required: true },
//         // album : { type: ObjectId, ref:'Album' },
//         courses : { type: Array, default:[]},
//         dateReleased : { type: String, default: Date.now },
//         dateCreated : { type: String, default: Date.now },
//         vote: {type: Number, default:0}
//     }
//
// );

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
});
var User = mongoose.model("User", nameSchema);

module.exports = User;