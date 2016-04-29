var logic = require('./logic.js').logic;

var User = function(socket) {
  this.socket = socket;
  this.choice = null;
  this.wins = null; 
};

var Game = function(playerSockets) {
  this.over = false;
  this.player1 = new User(playerSockets.player1);
  this.player2 = new User(playerSockets.player2);
  this.options = ['rich', 'bum', 'tax', 'cop', 'jail'];
  this.winner = null;
};

Game.prototype.init = function() {
  this.emit('gameReady');

  this.player1.socket.on('choices', function(data){
    this.player1.choice = data.player1Choice;
    this.choiceSubmitted();
  }.bind(this));

  this.player2.socket.on('choices', function(data){
    this.player2.choice = data.player2Choice;
    this.choiceSubmitted();
  }.bind(this));
};

Game.prototype.emit = function(event, data) {
  data = data || {};
  this.player1.socket.emit(event, data);
  this.player2.socket.emit(event, data);
};

Game.prototype.isOver = function() {
  this.over = true;
};

Game.prototype.choiceSubmitted = function() {
  if (this.player1.choice, this.player2.choice) {
    this.winner = logic(this.player1.choice, this.player2.choice);
    this.emit('gameResult', { message: this.winner });
  }
};

module.exports = {
  Game: Game
};
