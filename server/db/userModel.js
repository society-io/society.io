var mongo = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

<<<<<<< 557d724aa07e237e20ab126a576f26d6dbd06683
var usersSchema = new Schema({
  fbid: String,
  name: String,
=======
var env = process.env.NODE_ENV || "development" ;

if (env === "development"){
  mongoose.connect('mongodb://localhost/society');
  console.log('MongoDB Connection is Open!');
} else {
  mongoose.connect('MLAB URL');
  console.log("MongoDB is Connected!");
}

var usersSchema = new Schema({
>>>>>>> [Refactor] removed passport and implemented firebase for backend
  email: String,
  photo: String,
  accessToken: String,
  mmr: Number,
  wins: Number,
  losses: Number
});

var User = mongoose.model('user', usersSchema);
module.exports = User;