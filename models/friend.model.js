const mongoose = require('mongoose');

const FriendScheme = new mongoose.Schema({
    username: String,
});

module.exports = mongoose.model('Friend', FriendScheme);