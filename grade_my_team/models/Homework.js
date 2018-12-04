const mongoose = require('mongoose');

const HomeworkSchema = mongoose.Schema({
    type: String,
    data: Buffer
    // name: String,
    // course: { type: Schema.Types.ObjectId, ref: 'Course'},
    // members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Homewrok', HomeworkSchema);