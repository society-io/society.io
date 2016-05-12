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
      game.newRound();
    }

  // if either player has not submitted a choice yet
  } else {
    if (!game.player1.choice) {
      game.player1.emit('opponentPlayed');
      console.log('Player 1 Emitted: opponentPlayed');
    } else if (!game.player2.choice) {
      game.player2.emit('opponentPlayed');
      console.log('Player 2 Emitted: opponentPlayed');
    }
  }
};

Gamelogic.prototype.isMatchOver = function() {
  var game = this.game;
  var zeroCount1 = 0;
  var zeroCount2 = 0;

  for (var choice1 in game.player1.health) {
    if (game.player1.health[choice1] === 0) {
      zeroCount1++;
    }
  }

  for (var choice2 in game.player2.health) {
    if (game.player2.health[choice2] === 0) {
      zeroCount2++;
    }
  }

  if (zeroCount1 >= 4 || zeroCount2 >= 4) {
    return true;
  }

  return false;
};

module.exports = {
  Gamelogic: Gamelogic,
};
