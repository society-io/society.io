var mongo = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var env = process.env.NODE_ENV || "development" ;

if (env === "development"){
  mongoose.connect('mongodb://localhost/society');
  console.log('MongoDB Connection is Open!');
} else {
  mongoose.connect('MLAB URL');
  console.log("MongoDB is Connected!");
}

var usersSchema = new Schema({
  email: String,
  username: String,
  password: String,
  mmr: Number,
  wins: Number,
  losses: Number
});

var User = mongoose.model('user', usersSchema);
module.exports = User;