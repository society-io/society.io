var logic = require('./logic.js').logic;
var gameConfig = require('./config.js');

var User = function(socket) {
  this.socket = socket;
  this.health = Object.assign({}, gameConfig.options);
  this.choice = null;
  this.wins = null; 
};

var Game = function(playerSockets) {
  this.over = false;
  this.player1 = new User(playerSockets.player1);
  this.player2 = new User(playerSockets.player2);
  this.winner = null;
};

Game.prototype.init = function() {
  this.emit('gameReady', null,
    { playerId: 1 },
    { playerId: 2 }
  );

  this.player1.socket.on('choices', function(data){
    this.player1.choice = data.choice;
    this.choiceSubmitted();
  }.bind(this));

  this.player2.socket.on('choices', function(data){
    this.player2.choice = data.choice;
    this.choiceSubmitted();
  }.bind(this));
};

Game.prototype.emit = function(event, data, p1data, p2data) {
  if (p1data && p2data) {
    this.player1.socket.emit(event, p1data);
    this.player2.socket.emit(event, p2data);
  } else {
    data = data || {};
    this.player1.socket.emit(event, data);
    this.player2.socket.emit(event, data);
  }
};

Game.prototype.err = function(orig, msg) {
  this.emit('err', { originalData: orig, msg: msg });
};

Game.prototype.isOver = function() {
  this.over = true;
};

Game.prototype.choiceSubmitted = function() {
  if (this.player1.choice, this.player2.choice) {
    this.winner = logic.call(this, this.player1.choice, this.player2.choice);
    this.emit('gameResult', { message: this.winner });
  }
};

module.exports = {
  Game: Game
};
