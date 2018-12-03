const mongoose = require('mongoose');

const HomeworkSchema = mongoose.Schema({
    type: String,
    data: Buffer
});

module.exports = mongoose.model('Homewrok', HomeworkSchema);