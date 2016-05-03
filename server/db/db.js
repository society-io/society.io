var mongo = require('mongodb');
var mongoose = require('mongoose');
var user = require('./userModel.js');
// var query = require('./user/userController.js');
// var routes = require('./user/userRoutes.js');

var env = process.env.NODE_ENV || "development" ;



if (env === "development"){
mongoose.connect('mongodb://localhost/society');
console.log('MongoDB Connection is Open!');
} else {
mongoose.connect('MLAB URL');
console.log("MongoDB is Connected!");
}
