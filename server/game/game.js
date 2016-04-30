var logic = require('./logic.js');
var gameConfig = require('./config.js');

var User = function(id, socket) {
  // id should always be 1 or 2
  this.id = id;

  // reference to the underlying socket connection to user
  this.socket = socket;

  // health state
  this.health = Object.assign({}, gameConfig.options);

  // reference to the user choice
  this.choice = null;
};

var Game = function(playerSockets) {
  /**
   *  Game state properties (Constructor)
   *  
   *  Responsible for maintaining game state across 2 clients
   *  It will be passed by reference into instantiation of game logic
   */

  // instantiate 2 user objects with ids and socket references
  this.player1 = new User(1, playerSockets.player1);
  this.player2 = new User(2, playerSockets.player2);

  // convenience object: useful for passing health state to client
  this.health = {
    1: this.player1.health,
    2: this.player2.health
  };

  // round state
  this.roundOver = false;
  this.roundWinner = null;

  // match state
  this.matchOver = false;
  this.matchWinner = null;
};

Game.prototype.init = function() {
  /**
   *  Game Initialization
   *
   *  The init should be called alongside a game instantiation
   *  Sets up listeners for both players
   */
  this.emit('gameReady', null,
    { playerId: this.player1.id },
    { playerId: this.player2.id }
  );

  this.player1.socket.on('choice', function(data){
    console.log('user 1 submitted a choice');

    // validate
    if (this.player1.choice) {
      console.error('user 1 already has submitted a choice.');
      this.err(data, 'you have already submitted a choice.');
    } else {
      this.player1.choice = data.choice;
      this.choiceSubmitted();
    }
  }.bind(this));

  this.player2.socket.on('choice', function(data){
    console.log('user 2 submitted a choice');

    // validate
    if (this.player2.choice) {
      console.error('user 2 already has submitted a choice.');
      this.err(data, 'you have already submitted a choice.');
    } else {
      this.player2.choice = data.choice;
      this.choiceSubmitted();
    }
  }.bind(this));
};

Game.prototype.emit = function(event, data, p1data, p2data) {
  /**
   *  Socket emission to clients
   *
   *  Accepts a data 2nd object OR p1data and p2data objects
   *  If 3rd and 4th argument is passed, we emit 2 separate events to each individual user
   */

  // validation: make sure that either data OR p1data&p2data is defined
  if ( (data && (p1data || p2data)) ||
       (!data && (!p1data || !p2data))) {
    console.error('Game emission called with invalid arguments. game/game.js');
    console.error('data = ', data);
    console.error('p1data = ', p1data);
    console.error('p2data = ', p2data);
    return;
  }

  if (!data && p1data && p2data) {
    p1data.event = event;
    p2data.event = event;
    this.player1.socket.emit(event, p1data);
    this.player2.socket.emit(event, p2data);
  } else {
    data = data || {};
    data.event = event;
    this.player1.socket.emit(event, data);
    this.player2.socket.emit(event, data);
  }
};

Game.prototype.err = function(orig, msg) {
  this.emit('err', { originalData: orig, msg: msg });
};

Game.prototype.roundOver = function() {
  this.roundOver = true;
};

Game.prototype.choiceSubmitted = function() {
  // if both players have made a choice, evaluate round winner
  if (this.player1.choice && this.player2.choice) {
    console.log('player1 choice = ', this.player1.choice);
    console.log('player2 choice = ', this.player2.choice);
    this.roundWinner = logic.evalRound(this.player1.choice, this.player2.choice);
    this.emit('roundResult', {
      winner: this.roundWinner
    });
  }
};

module.exports = {
  Game: Game
};
