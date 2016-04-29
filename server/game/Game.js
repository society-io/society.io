var logic = require('./Logic.js');
var Logic = logic.Logic;

var Game = function(playerSockets) {
  this.over = false;
  this.player1 = new User(playerSockets.player1);
  this.player2 = new User(playerSockets.player2);
  this.options = ['rich', 'bum', 'tax', 'cop', 'jail'];
  this.choices = {player1:  null, player2: null};
  this.player1Played = false;
  this.player2Played = false;
  this.winner = null;
  this.player1.socket.on('choices', function(data){
    this.updatePlayer1Choice(data.player1Choice);
    this.player1Played = true;
  });
  this.player2.socket.on('choices', function(data){
    this.updatePlayer2Choice(data.player2Choice);
    this.player2Played = true;
  });
};

Game.prototype.isOver = function() {
    this.over = true;
};

Game.prototype.updatePlayer1Choice = function(data) {
    this.choices.player1 = data;
};

Game.prototype.updatePlayer2Choice = function(data) {
    this.choices.player2 = data;
};

Game.prototype.evaluateWinner = function(data) {
  if(this.player1Played && this.player2Played) {
    return this.winner = new Logic(this.choices.player1, this.choices.player2);
    this.isOver();
  }
};

var User = function(socket) {
  this.socket = socket;
  this.choice = null;
};

module.exports = {
  Game: Game
};