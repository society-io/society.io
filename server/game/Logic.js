var Logic = function(choice1, choice2) {
  switch (choice1, choice2) {

    // Tie Cases
    case 'rich', 'rich':
    case 'bum', 'bum':
    case 'tax', 'tax':
    case 'cop', 'cop':
    case 'jail', 'jail':
      this.winner = 'tie';
      return this.winner;

// Built This Out According to the society.io Pentagram //

    // Rich Beats:
    case 'rich', 'bum':
      this.winner = this.player1;
      return this.winner;

    case 'rich', 'cop':
      this.winner = this.player1;
      return this.winner;

    // Rich Loses:
    case 'rich', 'jail':
      this.winner = this.player2;
      return this.winner;

    case 'rich', 'taxes':
      this.winner = this.player2;
      return this.winner;

    // Bum Beats:
    case 'bum', 'jail':
      this.winner = this.player1;
      return this.winner;
    case 'bum', 'tax':
      this.winner = this.player1;
      return this.winner;

    // Bum Loses:
    case 'bum', 'cop':
      this.winner = this.player2;
      return this.winner;
    case 'bum', 'rich':
      this.winner = this.player2;
      return this.winner;

    // Tax Beats:
    case 'tax', 'cop':
      this.winner = this.player1;
      return this.winner;
    case 'tax', 'rich':
      this.winner = this.player1;
      return this.winner;

    // Tax Loses:
    case 'tax', 'jail':
      this.winner = this.player2;
      return this.winner;
    case 'tax', 'bum':
      this.winner = this.player2;
      return this.winner;

    // Cop Beats:
    case 'cop', 'jail':
      this.winner = this.player1;
      return this.winner;
    case 'cop', 'bum':
      this.winner = this.player1;
      return this.winner;

    // Cop Loses:
    case 'cop', 'tax':
      this.winner = this.player2;
      return this.winner;
    case 'cop', 'rich':
      this.winner = this.player2;
      return this.winner;

    // Jail Beats:
    case 'jail', 'rich':
      this.winner = this.player1;
      return this.winner;
    case 'jail', 'tax':
      this.winner = this.player1;
      return this.winner;

    // Jail Loses:
    case 'jail', 'bum':
      this.winner = this.player2;
      return this.winner;
    case 'jail', 'cop':
      this.winner = this.player2;
      return this.winner;
  }
};

module.exports = {
  Logic: Logic
};