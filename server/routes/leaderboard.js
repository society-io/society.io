var router = require('express').Router();
var db = require('../db/userModel.js');

router.get('/', function(req, res){
  db.find({}, function(err, users) {
  	var userMap = [];
  	users.forEach(function(user) {
  		userMap.push({id: user._id, username: user.username, wins: user.wins, losses: user.losses, mmr: user.mmr});
  	});
  	res.send(userMap);
  });


});

module.exports = router;