const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    book_title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;