var game = require('../game/game');
var db = require('../db/userModel.js');
var sockCheck= require('../socket/socketHelpers');

function formatMMR(player1, player2, num) {
	var p1mmr = player1.user._doc.mmr;
	var p1wins = player1.user._doc.wins;
	var p1losses = player1.user._doc.losses;

	var p2mmr = player2.user._doc.mmr;
	var p2wins = player2.user._doc.wins;
	var p2losses = player2.user._doc.losses;
	
	var newMMR = ELOResults(p1mmr, p2mmr, num);

	var query1 = {};
	query1._id = player1.user._doc._id;

	var db1 = {};
	db1.mmr = newMMR.player1NewELO;
	
	var query2 = {};
	query2._id = player2.user._doc._id;

	var db2 = {};
	db2.mmr = newMMR.player2NewELO;

	if (num === 0) {
		db1.losses = ++p1losses;
		db2.wins = ++p2wins;
	}
	else {
		db1.wins = ++p1wins;
		db2.losses = ++p2losses;
	}

	console.log('player1: object', db1, 'id', query1);
	console.log('player2: object', db2, 'id', query2);

	db.findOneAndUpdate(query1, {'$set': db1}, function (err, success) {
		if (err) {
			console.log("Error in Updating: ", err);
		} else {
			console.log('success!');
			player1.updateStats(db1);
		}
	});

	db.findOneAndUpdate(query2, {'$set': db2}, function (err, success) {
		if (err) {
			console.log("Error in Updating: ", err);
		} else {
			console.log('success!');
			player2.updateStats(db2);
		}
	});

}

function ELOResults(player1Elo, player2Elo, player1RESULT) {
  var newElos = {
    player1NewELO: null,
    player2NewELO: null
  };
  var k = 32;
  var player1EloTransformed = Math.pow(10,(player1Elo/400));
  var player2EloTransformed = Math.pow(10,(player2Elo/400));
  var player1ExpectedScore = player1EloTransformed/(player1EloTransformed + player2EloTransformed);
  var player2ExpectedScore = player2EloTransformed/(player2EloTransformed + player1EloTransformed);

  if (player1RESULT === 0) {
    newElos.player1NewELO = Math.round(player1Elo + k * (0 - player1ExpectedScore));
    newElos.player2NewELO = Math.round(player2Elo + k * (1 - player2ExpectedScore));
  }
  else if (player1RESULT === 1) {
    newElos.player1NewELO = Math.round(player1Elo + k * (1 - player1ExpectedScore));
    newElos.player2NewELO = Math.round(player2Elo + k * (0 - player2ExpectedScore));
  }
  else {
    newElos.player1NewELO = player1Elo;
    newElos.player2NewELO = player2Elo;
  }
  return newElos;
}

module.exports = {
  formatMMR: formatMMR
};
