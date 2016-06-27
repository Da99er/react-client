var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min:[2,'small name']
    },
    password: {
        type: String,
        required: true,
        min:[2,'small password']
    }
});

exports.user = mongoose.model('user', userSchema);
