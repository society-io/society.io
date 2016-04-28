var Logic = function(choice1, choice2) {
  switch (choice1, choice2) {

    // Tie Cases
    case 'rich', 'rich':
    case 'bum', 'bum':
    case 'tax', 'tax':
    case 'cop', 'cop':
    case 'jail', 'jail':
      return this.winner = 'tie';

// Built This Out According to the society.io Pentagram //

    // Rich Beats:
    case 'rich', 'bum':
      return this.winner = this.player1;

    case 'rich', 'cop':
      return this.winner = this.player1;

    // Rich Loses:
    case 'rich', 'jail':
      return this.winner = this.player2;

    case 'rich', 'taxes':
      return this.winner = this.player2;

    // Bum Beats:
    case 'bum', 'jail':
      return this.winner = this.player1;
    case 'bum', 'tax':
      return this.winner = this.player1;

    // Bum Loses:
    case 'bum', 'cop':
      return this.winner = this.player2;
    case 'bum', 'rich':
      return this.winner = this.player2;

    // Tax Beats:
    case 'tax', 'cop':
      return this.winner = this.player1;
    case 'tax', 'rich':
      return this.winner = this.player1;

    // Tax Loses:
    case 'tax', 'jail':
      return this.winner = this.player2;
    case 'tax', 'bum':
      return this.winner = this.player2;

    // Cop Beats:
    case 'cop', 'jail':
      return this.winner = this.player1;
    case 'cop', 'bum':
      return this.winner = this.player1;

    // Cop Loses:
    case 'cop', 'tax':
      return this.winner = this.player2;
    case 'cop', 'rich':
      return this.winner = this.player2;

    // Jail Beats:
    case 'jail', 'rich':
      return this.winner = this.player1;
    case 'jail', 'tax':
      return this.winner = this.player1;

    // Jail Loses:
    case 'jail', 'bum':
      return this.winner = this.player2;
    case 'jail', 'cop':
      return this.winner = this.player2;
  }
};

module.exports = {
  Logic: Logic
};