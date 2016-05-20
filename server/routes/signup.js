var router = require('express').Router();
var bcrypt = require('bcrypt');
var FirebaseTokenGenerator = require("firebase-token-generator");
var pI = require('../config/config.js');
var newUser = require('../db/userModel.js');

var tokenGenerator = new FirebaseTokenGenerator(pI.secret);

var saltRounds = 10;

router.post('/', function(req, res){
    var userInputPassword = req.body.password;
    if (req.body.username === undefined || 
        req.body.username.length > 13   || 
        req.body.password === undefined || 
        req.body.password < 4           || 
        req.body.email === undefined    || 
        req.body.avatar === ''          || 
        req.body.username.length < 1    || 
        req.body.email.length < 1       || 
        req.body.password.length < 1) {
       
        res.send({credentialsMissing: true, message: "Error! Invalid Input."});
        
    } else {
    
    newUser.find({$or: [{email: req.body.email}, {username: req.body.username}]}, function(err, users) {
    	if(users.length === 0) {
    		bcrypt.hash(userInputPassword, saltRounds, function(err, hash) {
    			new newUser({email: req.body.email, 
                       username: req.body.username, 
                       password: hash, 
                       avatar: req.body.avatar,
                       mmr: 1600, 
                       wins: 0, 
                       losses: 0})
          .save(function(err, post) {
            if(err){
              console.log('User NOT Saved in DB! ', err);
            } else {
              newUser.find({username: req.body.username}, function(err, users) {
                if(err){
                  console.log('User Saved in DB, Error Assigning Token!');
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
    	  console.log("Email or username taken!");
        res.send({exists: true, message: 'Email or username taken!'});
    	}
    });
  }
});

module.exports = router;