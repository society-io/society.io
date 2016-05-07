var router = require('express').Router();
var bcrypt = require('bcrypt');
var FirebaseTokenGenerator = require("firebase-token-generator");
var pI = require('../config/config.js');
var newUser = require('../db/userModel.js');

var tokenGenerator = new FirebaseTokenGenerator(pI.secret);

var saltRounds = 10;

router.post('/', function(req, res){
	var userInputPassword = req.body.password;
  if(req.body.username === undefined || req.body.password === undefined || req.body.email === undefined) {
    res.send({credentialsMissing: true, message: "Dude, c'mon."});
  } else {
    newUser.find({username: req.body.username}, function(err, users) {
    	if(users.length === 0){
    		bcrypt.hash(userInputPassword, saltRounds, function(err, hash) {
    			new newUser({email: req.body.email, username: req.body.username, password: hash, mmr: 1600, wins: 0, losses: 0})
    			  .save(function(err, post) {
    			  	if(err){
    			  		console.log('Could not save user in database.  ERROR:  ', err);
    			  	} else {
    			  		newUser.find({username: req.body.username}, function(err, users) {
    			  			if(err){
    			  				console.log('You are in the database now, but we cant find you to give you a token');
    			  			} else {
    			  				var stringUID = users[0]._id.toString();
    			  				var token = tokenGenerator.createToken({uid: stringUID, username: users[0].username});
    			  				res.send({token: token});
    			  			}
    			  		});
    			  	}
    			  });
    		});
    	} else {
    		console.log("Username taken!");
        res.send({nameExists: true, message: 'Username already exists!'}); //if username already in database upon signup
    	}
    });
  }
});

module.exports = router;
