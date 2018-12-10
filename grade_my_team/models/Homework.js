const mongoose = require('mongoose');

const HomeworkSchema = mongoose.Schema({
    type: String,
    data: Buffer,
    name: String,
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    graded: Boolean
    // members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Homework', HomeworkSchema);