var logic = require('./logic.js').logic;

var Game = function(playerSockets) {
  this.over = false;
  this.player1 = new User(playerSockets.player1);
  this.player2 = new User(playerSockets.player2);
  this.options = ['rich', 'bum', 'tax', 'cop', 'jail'];
  this.choices = {player1:  null, player2: null};
  this.player1Played = false;
  this.player2Played = false;
  this.winner = null;
};

Game.prototype.init = function() {
  this.emit('gameReady');

  this.player1.socket.on('choices', function(data){
    this.updatePlayer1Choice(data.player1Choice);
  });
  this.player2.socket.on('choices', function(data){
    this.updatePlayer2Choice(data.player2Choice);
  });
};

Game.prototype.emit = function(event, data) {
  data = data || {};
  this.player1.socket.emit(event, data);
  this.player2.socket.emit(event, data);
};

Game.prototype.isOver = function() {
    this.over = true;
};

Game.prototype.updatePlayer1Choice = function(data) {
    this.choices.player1 = data;
    this.player1Played = true;
    this.evaluateWinner();
};

Game.prototype.updatePlayer2Choice = function(data) {
    this.choices.player2 = data;
    this.player2Played = true;
    this.evaluateWinner();
};

Game.prototype.evaluateWinner = function() {
  if(this.player1Played && this.player2Played) {
    this.winner = logic(this.choices.player1, this.choices.player2);
    this.emit('gameResult', {message: this.winner});
  }
};

var User = function(socket) {
  this.socket = socket;
  this.choice = null;
};

module.exports = {
  Game: Game
};
