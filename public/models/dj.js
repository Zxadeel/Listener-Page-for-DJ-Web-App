const mongoose = require('mongoose');

const djSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    timeslot: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: true
    },
    emotion: {
        type: String,
        required: true
    },
    rhythm: {
        type: String,
        required: true
    }
});

const DJ = mongoose.model('DJ', djSchema);

module.exports = DJ;