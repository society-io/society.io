var gameConfig = require('./config');

var Player = function(id, socketAPI, events) {
  // id should always be 1 or 2
  this.id = id;

  // reference to the socketAPI
  this.socketAPI = socketAPI;

  // reference to the underlying socket for the user
  this.socket = socketAPI.socket;

  // a reference to the parents event storage
  this.events = events;

  // health state
  this.health = Object.assign({}, gameConfig.options);

  // reference to the user choice
  this.choice = null;

  // game ready state
  this.readyToPlay = false;
};

/**
 *  Choices / Health
 *
 *  resetChoice:  resets choice - used when a round winner is determined
 *  updateChoice: stores the user choice
 *  updateHealth: subtracts 1 health from the losing choice
 *  gameReady: invoked when the client side has emitted a 'client ready' event.
 */
Player.prototype.resetChoice = function() {
  this.choice = null;
};

Player.prototype.updateChoice = function(choice) {
  if (this.choice) {
    console.error('player ' + this.id + ' has already submitted a choice!');
    this.err('You\'ve already submitted a choice!');
  } else if (this.health[choice] === 0) {
    console.error('player ' + this.id + ' is out of health for that option.');
    this.err('You are out of health for that option.');
  } else {
    this.choice = choice;
    this.trigger('playerChoiceUpdated');
  }
};

Player.prototype.updateHealth = function(choice) {
  console.log('updateHealth called. choice = ', choice);
  if (!choice || choice === 'noChoice') {
    for (var option in this.health) {
      if (this.health[option] > 0) {
        console.log('subtracing ' + option + ' from health.');
        this.health[option]--;
        return;
      }
    }
  } else {
    this.health[choice]--;
  }
};

Player.prototype.ready = function() {
  console.log('triggering playerReady');
  this.readyToPlay = true;
  this.trigger('playerReady');
};

Player.prototype.forfeit = function() {
  this.trigger('forfeit');
};

/**
 *  Convenience wrapper functions for socket emissions
 *
 *  err:  emit 'err' signal to client
 *  emit: emit any signal to client
 */
Player.prototype.err = function(msg) {
  this.emit('err', { msg: msg });
};

Player.prototype.emit = function(event, data) {
  this.socket.emit(event, data);
};

Player.prototype.on = function(event, cb) {
  this.socket.on(event, cb);
};

// Event triggers that the game is listening to
Player.prototype.trigger = function(event) {
  console.log('trigger called. event = ', event);
  if (!this.events[event]) {
    console.error(event + ' is not a registered event.');
  } else {
    // pass a reference of the player into the event listener callback
    this.events[event](this);
  }
};

module.exports = {
  Player: Player
};
