/** @module models/Course
 * The Course Model
 * Schema:
 * _id            ObjectId   required   Unique identifier of the track
 * name           String     required   Name
 * professor      ObjectId   required   Surname (reference to users)
 * students       Array      required   An array of the ids of the students enrolled in it. Default: []. (reference to users)
 */


'use strict';

var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    name: { type: String},
    professor: { type: String},
    students: { type: Array, default:[]}
});
var Course = mongoose.model("Course", courseSchema);

module.exports = Course;