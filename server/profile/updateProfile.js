var common = ('../common');
var game = require('../game/game');
var db = require('../db/userModel');
var sockCheck= require('../socket/socketHelpers');

function formatMMR (p1ayer1SockAPI, p1ayer2SockAPI, num) {
  var p1mmr = p1ayer1SockAPI.user.mmr;
  var p1wins = p1ayer1SockAPI.user.wins;
  var p1losses = player1SocketAPI.user.losses;

  var p2mmr = p1ayer2SockAPI.user.mmr;
  var p2wins = p1ayer2SockAPI.user.wins;
  var p2losses = player2SocketAPI.user.losses;
  
  var newMMR = ELOResults(p1mmr, p2mmr, num);

  var query1 = player1SocketAPI.id;
  var db1 = {};
  db1.mmr = newMMR.player1NewELO;

  var query2= player2SocketAPI.id;
  var db2 = {};

  db1.mmr = newMMR.player2NewELO;

  if (num === 0) {
    db1.losses = p1losses++;
    db2.wins = p2wins++;
  }
  else {
    db1.wins = p1wins++;
    db2.losses = p2losses++;
  }

  db.findOneandUpdate(query1, db1);
  db.findOneandUpdate(query2, db2);

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
