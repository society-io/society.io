var Gamelogic = require('./logic').Gamelogic;
var Player = require('./player').Player;

var onDisconnect = function(player) {
  console.log(player + ' socket disconnected!');
  this.terminate('a player disconnected.');
};

var onChoice = function(player, data) {
  console.log('inside of onChoice ====== ');
  console.log('player = ', player);
  console.log('inside of onChoice. data.choice = ', data.choice);
  console.log('========================= ');
  this[player].updateChoice(data.choice);
};

var Game = function(playerSockets) {
  /**
   *  Game state properties (Constructor)
   *  
   *  Responsible for maintaining game state across 2 clients
   *  It will be passed by reference into instantiation of game logic
   */

  // event listener/trigger storage
  this.events = {};

  // instantiate 2 user objects with ids and socket references
  this.player1 = new Player(1, playerSockets.player1, this.events);
  this.player2 = new Player(2, playerSockets.player2, this.events);

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
  this.logic = new Gamelogic(this);

  // socket listeners
  this.player1.socket.on('choice', onChoice.bind(this, 'player1'));
  this.player2.socket.on('choice', onChoice.bind(this, 'player2'));
  this.player1.socket.on('disconnect', onDisconnect.bind(this, 'player1'));
  this.player2.socket.on('disconnect', onDisconnect.bind(this, 'player2'));

  // player eventing listeners
  this.playerOn('playerChoiceUpdated', function(player) {
    this.logic.choiceSubmitted();
  }.bind(this));

  // emit game ready to start game
  console.log('emitting gameready');
  this.emit('gameReady', null,
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

module.exports = {
  Game: Game
};
