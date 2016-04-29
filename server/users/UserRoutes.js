var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
	name: String,
	username: String,
	password: String,
	rdm : Number,
	wins: Number,
	looses: Number
})
var port = 1337;

module.exports = {
    port: port,
    db: 'mongodb://localhost/todos'
};