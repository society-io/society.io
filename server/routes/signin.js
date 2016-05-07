var router = require('express').Router();
var bcrypt = require('bcrypt');
var FirebaseTokenGenerator = require("firebase-token-generator");
var pI = require('../config/config.js');
var db = require('../db/userModel.js');

var tokenGenerator = new FirebaseTokenGenerator(pI.secret);

router.post('/', function(req, res){
	
	if(req.body.username === undefined || req.body.password === undefined || req.body.username.length < 1 || req.body.password.length < 1) {
    res.send({credentialsMissing: true, message: "Dude, c'mon."});
  }

	db.find({username: req.body.username}, function(err, users){
		if(users.length) {
			bcrypt.compare(req.body.password, users[0].password, function(err, result) {
				if(err){
					console.log('Compare function had this error:  ', err);
				}
				if(result) {
					console.log('User got his/her password correct');
					var stringUID = users[0]._id.toString();
					var token = tokenGenerator.createToken({uid: stringUID, username: users[0].username});
					res.send({token: token, auth: result});
				} else {
					console.log('User got his/her password incorrect');
					res.send({auth: result, message: 'Invalid username or password'});
				}
			});
		} else {
			console.log("Username does not exist!");
			res.send({auth: false, message: 'Invalid username or password'});
		}
	});
});


module.exports = router;

