var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

// env is the environment in which your Terminal is processing your git commands.
  //In "development", the db will connect to your localhost url + port.
var env = process.env.NODE_ENV || "development" ;

if (env === "development"){
mongoose.connect('mongodb://localhost/society');
} else {
mongoose.connect('MLAB URL');
console.log("MongoDB is Connected!");
}

// declare a new Schema using mongoose's Schema method. See Docs.
var Schema = mongoose.Schema;

// When mongoose fails to connect...
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// When mongoose successfully connects...
mongoose.connection.once('open', function() {
  console.log('MongoDB is Connected!');
});

// Define your Users' Schema.
var usersSchema = new Schema ({
    fbid: String,
    token: String,
    name: String,
    email: String,
    mmr: Number,
    wins: Number,
    losses: Number
});

// Declare & Export a User model using mongoose's model method. See Docs.
module.exports = mongoose.model('users', usersSchema);
