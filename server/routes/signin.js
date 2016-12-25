var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../config/config.js').jwtSecret;
var db = require('../db/userModel.js');

router.post('/', function (req, res) {
	if (req.body.username === undefined || 
	    req.body.password === undefined || 
	    req.body.username.length < 1    || 
	    req.body.password.length < 1) {
	    
		    res.send({credentialsMissing: true, message: "Dude, c'mon."});
	    }

	db.find({username: req.body.username}, function (err, users) {
		if (users.length) {
			bcrypt.compare(req.body.password, users[0].password, function (err, result) {
				if (err) {
					console.log('bcryptError:  ', err);
				}
				if (result) {
					console.log('passwordCorrect');
					var stringUID = users[0]._id.toString();
					var token = jwt.sign({
						uid: stringUID,
						username: users[0].username
					}, jwtSecret, {
						expiresIn: '7d'
					});
					res.send({token: token, auth: result});
				} else {
					console.log('passwordIncorrect');
					res.send({auth: result, message: 'Invalid username or password'});
				}
			});
		} else {
			console.log("Username Does Not Exist!");
			res.send({auth: false, message: 'Invalid username or password'});
		}
	});
});


module.exports = router;
