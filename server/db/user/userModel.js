var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new Schema ({
    fbid: String,
    token: String,
    name: String,
    email: String,
    mmr: Number,
    wins: Number,
    losses: Number
});

module.exports = mongoose.model('users', usersSchema);