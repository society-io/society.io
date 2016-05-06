var Gamelogic = require('./logic').Gamelogic;
var Player = require('./player').Player;
var listeners = require('./listeners');

var Game = function(player1Socket, player2Socket) {
  /**
   *  Game state properties (Constructor)
   *
   *  Responsible for maintaining game state across 2 clients
   *  It will be passed by reference into instantiation of game logic
   */

  // event listener/trigger storage
  this.events = {};

  // instantiate 2 user objects with ids and socket references
  this.player1 = new Player(1, player1Socket, this.events);
  this.player2 = new Player(2, player2Socket, this.events);

  // convenience object: useful for passing health state to client (?)
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
   *  Sets up game logic, socket listeners, and player listeners
   */
  var game = this;

  game.logic = new Gamelogic(game);

  // socket listeners
  ['player1', 'player2'].forEach(function(player) {
    game[player].on('disconnect', listeners.onDisconnect.bind(game, player));
    game[player].on('choice', listeners.onChoice.bind(game[player]));
    game[player].on('noChoice', listeners.onNoChoice.bind(game[player]));
    game[player].on('clientGameReady', listeners.onClientGameReady.bind(game, player));
  });

  // player eventing listeners
  game.playerOn('playerChoiceUpdated', function(player) {
    game.logic.choiceSubmitted();
  });

  // emit game ready to start game
  console.log('emitting gameready');
  game.emit('gameReady', null,
    { playerId: this.player1.id, startingHealth: this.player1.health },
    { playerId: this.player2.id, startingHealth: this.player2.health }
  );
};

Game.prototype.emit = function(event, data, p1data, p2data) {
  /**
   *  Socket emission to players
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

  console.log('inside of imit. event = ', event);
  console.log('data = ', data);

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

Game.prototype.roundOver = function() {
  this.roundOver = true;
};

Game.prototype.terminate = function(reason) {
  this.emit('matchTerminated', {
    reason: reason
  });
  this.player1.socket.disconnect();
  this.player2.socket.disconnect();
};

Game.prototype.playerOn = function(event, cb) {
  /**
   *  Register a callback for the player to trigger
   *
   *  Utilize this custom eventing function when needing to pass information
   *  from individual players to trigger game logic related events
   */
  this.events[event] = cb;
};

Game.prototype.newRound = function() {
  setTimeout(function() {
    this.emit('newRound', {});
  }.bind(this), 3000);
};

module.exports = {
  Game: Game
};
