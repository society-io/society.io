var Gamelogic = require('./logic').Gamelogic;
var Player = require('./player').Player;
var listeners = require('./listeners');
var formatMMR = require('../profile/updateProfile').formatMMR;

var Game = function(player1Socket, player2Socket) {
  /**
   *  Game state properties (Constructor)
   *
   *  Responsible for maintaining game state across 2 clients
   *  It will be passed by reference into instantiation of game logic
   */

  // event listener/trigger storage
  this.events = {};
	console.log('GAME EVENTS: '.red, this.events)
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
  this.updateMMR = false;
};

Game.prototype.init = function() {
  console.log('Game.init Called');
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
    game[player].on('client ready', listeners.onClientGameReady.bind(game[player]));
    game[player].on('forfeit', listeners.onForfeit.bind(game[player]));
  });

  // player eventing listeners
  game.playerOn('playerChoiceUpdated', function(player) {
    console.log('invoking game.logic.choiceSubmitted()');
    game.logic.choiceSubmitted();
  });

  // once both players are ready, emit gameReady to both clients.
  game.playerOn('playerReady', function(player) {
    if (game.player1.readyToPlay && game.player2.readyToPlay) {
	    console.log('PLAYER PLAYER READY EMIT'.red);

      game.emit('gameReady', null, {
          // player 1
          playerId: game.player1.id,
          startingHealth: game.player1.health,
          playerProfile: game.player1.profile,
          opponentProfile: game.player2.profile
        }, {
          // player 2
          playerId: game.player2.id,
          startingHealth: game.player2.health,
          playerProfile: game.player2.profile,
          opponentProfile: game.player1.profile
        });
	    console.log('GAME READY EMIT'.yellow);

      game.newRound();
    }
  });

  // on forfeit
  game.playerOn('forfeit', function(player) {
    game.matchOver = true;
    game.roundWinner = player.id === 1 ? 2 : 1;
    game.matchWinner = game.roundWinner;

    // emit match result
    game.emit('forfeitedResults', {
      winner: game.roundWinner,
    });
    game.terminate('gameOver');
  });
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
    console.log('Game emission called with invalid arguments. game/game.js');
    console.log('data = ', data);
    console.log('p1data = ', p1data);
    console.log('p2data = ', p2data);
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
    console.log('GAME PLAYER1 EMIT'.cyan, event, data)
    this.player2.socket.emit('GAME PLAYER2 EMIT'.cyan, event, data);
  }
};

Game.prototype.roundOver = function() {
  this.roundOver = true;
};

Game.prototype.terminate = function(reason) {
  this.emit('matchTerminated', {
    reason: reason
  });

  var winner;

  if (this.matchWinner === this.player1.id) {
    winner = 1;
  } else {
    winner = 0;
  }

  if (reason === 'a player disconnected') {
    console.log('reason is = ', reason);
  }

if (!this.updateMMR) {
	formatMMR(this.player1.socketAPI, this.player2.socketAPI, winner);
	this.updateMMR = true;
	}
};

Game.prototype.playerOn = function(event, cb) {
  /**
   *  Register a callback for the player to trigger
   *
   *  Utilize this custom eventing function when needing to pass information
   *  from individual players to trigger game logic related events
   */
   
  console.log('GAME PLAYERON '.cyan, event);
  this.events[event] = cb;
};

Game.prototype.newRound = function() {
  setTimeout(function() {
    this.emit('newRound', {});
  }.bind(this), 2500);
};

module.exports = {
  Game: Game
};
