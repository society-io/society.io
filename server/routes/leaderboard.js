var router = require('express').Router();
var db = require('../db/userModel.js');

router.get('/', function(req, res){
  db.find({}, function(err, users) {
  	var userMap = {};

  	users.forEach(function(user) {
  		userMap[user._id] = user;
  	});

  	res.send(userMap);
  });
});

module.exports = router;