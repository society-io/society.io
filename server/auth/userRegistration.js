var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = require('./User.model.js');
var jwt = require('jwt-simple');
var https = require('https');
var Q = require("q");


module.exports.userSignup = function(username, password, response) {

	User.findOne({username: username}, function(err, user) {
		if(err) {
			console.error('error', err);
			response.status(500).send("Server error.");
		} else {
			if(user === null) {
				var hash = bcrypt.hashSync(password);
				var user = new User({
					username: username,
					password: hash
				});

				user.save(function(err, user) {
					if(err) {
						console.error('error', err);
						response.status(500).send("Server error.")

					} else {
						console.log("user is added.");
						createToken(response, user.id);
						//response.status(201).send("User added.");
					}
				});
			} else {
				response.status(409).send("User exists.");
			}

		}
	})

};