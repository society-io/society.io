var router = require('express').Router();
var bcrypt = require('bcrypt');
var FirebaseTokenGenerator = require("firebase-token-generator");
var pI = require('../config/config.js');
var db = require('../db/userModel.js');


var tokenGenerator = new FirebaseTokenGenerator(pI.secret);

router.post('/', function(req, res){
	db.find({username: req.body.username}, function(err, users){
		if(users.length){
			bcrypt.compare(req.body.password, users[0].password, function(err, result) {
				if(err){
					console.log('wrong password!');
				} else {
					var stringUID = users[0]._id.toString();
					var token = tokenGenerator.createToken({uid: stringUID, some: 'arbritrary', data: 'here'});
					res.send({token: token});
				}
			});
		} else {
			console.log("username does not exist!");
		}
	});
});


module.exports = router;

