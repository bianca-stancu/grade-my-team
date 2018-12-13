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
var User = require('./User');

var courseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String},
    professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    professorName: { type: String},
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' , default:[]}]
});

// Find Professor's id before saving
courseSchema.pre('save', function (next) {
    var course = this;
    if(!this.isModified('professor')){
        return next();
    }
    var prof = course.professorName.split(" ");
    User.findOne({ firstName: prof[0], lastName: prof[1] }, function (err, user){
        if (err) {
            console.log("Course " + course.name + " can not be created because professor " + course.professorName + " does not exist.");
            return next(err);
        }
        course.professor = user._id;
        user.courses.push(course._id);
        user.save();
        return next();
    });
});

var Course = mongoose.model("Course", courseSchema);

module.exports = Course;