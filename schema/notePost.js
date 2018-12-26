const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notePost = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    createAt: {
        type: Date, 
        required: true
    },
    updatedAt: {
        type: Date
    }
});
module.exports = mongoose.model('notepost', notePost);