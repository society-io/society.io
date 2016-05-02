var evalRound = require('./evalRound');

var Gamelogic = function(game) {
  this.game = game;
};

Gamelogic.prototype.choiceSubmitted = function() {
  var game = this.game;
  var p1choice = game.player1.choice;
  var p2choice = game.player2.choice;

  // if both players have made a choice, evaluate round winner
  if (p1choice && p2choice) {
    console.log('player1 choice = ', p1choice);
    console.log('player2 choice = ', p2choice);
    game.roundWinner = evalRound(p1choice, p2choice);

    if (game.roundWinner === 3) {
      game.player1.updateHealth();
      game.player2.updateHealth();
    }

    // update the health of the round loser
    if (game.roundWinner === 1) {
      game.player2.updateHealth(p2choice);
    } else if (game.roundWinner === 2) {
      game.player1.updateHealth(p1choice);
    }

    // emit round result to client
    game.emit('roundResult', {
      roundWinner: game.roundWinner,
      choices: {
        1: p1choice,
        2: p2choice
      },
      health: game.health
    });

    // check if match is over
    if (this.isMatchOver()) {
      game.matchOver = true;
      game.matchWinner = game.roundWinner;

      game.emit('matchResult', {
        winner: game.roundWinner
      });
      game.terminate('gameOver');

    // if not, reset choices and emit newRound to players
    } else {
      game.player1.resetChoice();
      game.player2.resetChoice();
      game.emit('newRound', {
        health: game.health
      });
    }
  }
};

Gamelogic.prototype.isMatchOver = function() {
  var game = this.game;
  var zeroCount = 0;

  for (var id in game.health) {
    for (var choice in game.health[id]) {
      if (game.health[id][choice] === 0) {
        zeroCount++;
      }
    }
  }

  console.log('zeroCount = ', zeroCount);

  if (zeroCount >= 4) {
    return true;
  }

  return false;
};

module.exports = {
  Gamelogic: Gamelogic, 
};
