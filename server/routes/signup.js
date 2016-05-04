var router = require('express').Router();
var bcrypt = require('bcrypt');
var FirebaseTokenGenerator = require("firebase-token-generator");
var pI = require('../config/config.js');
var newUser = require('../db/userModel.js');

var tokenGenerator = new FirebaseTokenGenerator(pI.secret);

var saltRounds = 10;


router.post('/', function(req, res){
	var userInputPassword = req.body.password;

  newUser.find({email: req.body.email}, function(err, users) {
  	if(users.length === 0){
  		bcrypt.hash(userInputPassword, saltRounds, function(err, hash) {
  			new newUser({email: req.body.email, username: req.body.username, password: hash, mmr: 1600, wins: 0, losses: 0})
  			  .save(function(err, post) {
  			  	if(err){
  			  		console.log('saving went haywire.');
  			  	} else {
  			  		newUser.find({email: req.body.email}, function(err, users) {
  			  			if(err){
  			  				console.log('you cant find after save...');
  			  			} else {
  			  				var stringUID = users[0]._id.toString();
  			  				var token = tokenGenerator.createToken({uid: stringUID, some: "arbitrary", data: "here"});
  			  				res.send({token: token});
  			  			}
  			  		});
  			  	}
  			  });
  		});
  	} else {
  		console.log("username taken!");
  	}
  });



});



module.exports = router;