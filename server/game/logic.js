var Gamelogic = function(game) {
  this.game = game;
};

Gamelogic.prototype.evalRound = function(choice1, choice2) {
  var result;

  console.log('choice1 = ', choice1);
  console.log('choice2 = ', choice2);

  switch (choice1.toLowerCase() + '|' + choice2.toLowerCase()) {
    // Tie Cases
    case 'rich|rich':
    case 'bum|bum':
    case 'tax|tax':
    case 'cop|cop':
    case 'jail|jail':
      result = 0;
      break;

    /**
     *  rich
     *
     *  Beats: bum, cop
     *  Loses: jail, taxes
     */
    case 'rich|bum':
    case 'rich|cop':
      result = 1;
      break;
    case 'rich|jail':
    case 'rich|tax':
      result = 2;
      break;

    /**
     *  bum
     *
     *  Beats: jail, tax
     *  Loses: cop, rich
     */
    case 'bum|jail':
    case 'bum|tax':
      result = 1;
      break;
    case 'bum|cop':
    case 'bum|rich':
      result = 2;
      break;

    /**
     *  tax
     *
     *  Beats: cop, rich
     *  Loses: jail, bum
     */
    case 'tax|cop':
    case 'tax|rich':
      result = 1;
      break;
    case 'tax|jail':
    case 'tax|bum':
      result = 2;
      break;

    /**
     *  cop
     *
     *  Beats: jail, bum
     *  Loses: tax, rich
     */
    case 'cop|jail':
    case 'cop|bum':
      result = 1;
      break;
    case 'cop|tax':
    case 'cop|rich':
      result = 2;
      break;

    /**
     *  jail
     *
     *  Beats: rich, tax
     *  Loses: bum, cop
     */
    case 'jail|rich':
    case 'jail|tax':
      result = 1;
      break;
    case 'jail|bum':
    case 'jail|cop':
      result = 2;
      break;
  }

  console.log('returning result. result = ', result);
  return result;
};

Gamelogic.prototype.choiceSubmitted = function() {
  var game = this.game;

  // if both players have made a choice, evaluate round winner
  if (game.player1.choice && game.player2.choice) {
    console.log('player1 choice = ', game.player1.choice);
    console.log('player2 choice = ', game.player2.choice);
    game.roundWinner = game.logic.evalRound(game.player1.choice, game.player2.choice);
    game.emit('roundResult', {
      winner: game.roundWinner,
      choices: {
        1: game.player1.choice,
        2: game.player2.choice
      }
    });
  }
};

module.exports = {
  Gamelogic: Gamelogic, 
};
