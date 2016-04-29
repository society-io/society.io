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
/*this.choices = [Object.create(this.player1), Object.create(this.player2)];*/
  this.winner = null;
};

Game.prototype.init = function() {

  this.emit('gameReady');

  this.player1.socket.on('choices', function(data){
    this.player1.choice = data.player1Choice;
  });

  this.player2.socket.on('choices', function(data){
    this.player2.choice = data.player2Choice;
  });

  this.player1.choice && this.player2.choice ?
    this.updateChoice(this.player1.choice, this.player2.choice) :
    null;
};


Game.prototype.emit = function(event, data) {
  data = data || {};
  this.player1.socket.emit(event, data);
  this.player2.socket.emit(event, data);
};

Game.prototype.isOver = function() {
    this.over = true;
};

Game.prototype.updateChoice = function(player1Choice, player2Choice) {
    this.winner = logic(player1Choice, player2Choice);
    this.emit('gameResult', {message: this.winner});
};

module.exports = {
  Game: Game
};
