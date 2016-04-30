var gameConfig = require('./config');

var Player = function(id, socket, events) {
  // id should always be 1 or 2
  this.id = id;

  // reference to the underlying socket connection to user
  this.socket = socket;

  // a reference to the parents event storage
  this.events = events;

  // health state
  this.health = Object.assign({}, gameConfig.options);

  // reference to the user choice
  this.choice = null;
};

Player.prototype.updateChoice = function(choice) {
  // We return a boolean from this function to indicate a successfull choice update
  if (this.choice) {
    console.error('player ' + this.id + ' player has already submitted a choice!');
    this.err('You\'ve already submitted a choice!');
  } else {
    this.choice = choice;
    this.trigger('playerChoiceUpdated');
  }
};

// Convenience wrapper functions for socket emissions
Player.prototype.err = function(msg) {
  this.emit('err', { msg: msg });
};
Player.prototype.emit = function(event, data) {
  this.socket.emit(event, data);
};

// Event triggers that the game is listening to
Player.prototype.trigger = function(event) {
  if (!this.events[event]) {
    console.error(event + ' is not a registered event.');
  } else {
    this.events[event](this);
  }
};

module.exports = {
  Player: Player
};
