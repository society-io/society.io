var mongo = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var env = process.env.NODE_ENV;

mongoose.connect('mongodb://localhost/society');
console.log('MongoDB Connection is Open!');

var usersSchema = new Schema({
  email: String,
  username: String,
  password: String,
  avatar: String,
  mmr: Number,
  wins: Number,
  losses: Number
});

var User = mongoose.model('user', usersSchema);
module.exports = User;