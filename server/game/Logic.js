var logic = function(choice1, choice2) {
  switch (choice1, choice2) {

    // Tie Cases
    case 'rich', 'rich':
    case 'bum', 'bum':
    case 'tax', 'tax':
    case 'cop', 'cop':
    case 'jail', 'jail':
      this.winner = 'tie';
      break;

    // Built This Out According to the society.io Pentagram //

    // Rich Beats:
    case 'rich', 'bum':
      this.winner = this.player1;
      break;

    case 'rich', 'cop':
      this.winner = this.player1;
      break;

    // Rich Loses:
    case 'rich', 'jail':
      this.winner = this.player2;
      break;

    case 'rich', 'taxes':
      this.winner = this.player2;
      break;

    // Bum Beats:
    case 'bum', 'jail':
      this.winner = this.player1;
      break;
    case 'bum', 'tax':
      this.winner = this.player1;
      break;

    // Bum Loses:
    case 'bum', 'cop':
      this.winner = this.player2;
      break;
    case 'bum', 'rich':
      this.winner = this.player2;
      break;

    // Tax Beats:
    case 'tax', 'cop':
      this.winner = this.player1;
      break;
    case 'tax', 'rich':
      this.winner = this.player1;
      break;

    // Tax Loses:
    case 'tax', 'jail':
      this.winner = this.player2;
      break;
    case 'tax', 'bum':
      this.winner = this.player2;
      break;

    // Cop Beats:
    case 'cop', 'jail':
      this.winner = this.player1;
      break;
    case 'cop', 'bum':
      this.winner = this.player1;
      break;

    // Cop Loses:
    case 'cop', 'tax':
      this.winner = this.player2;
      break;
    case 'cop', 'rich':
      this.winner = this.player2;
      break;

    // Jail Beats:
    case 'jail', 'rich':
      this.winner = this.player1;
      break;
    case 'jail', 'tax':
      this.winner = this.player1;
      break;

    // Jail Loses:
    case 'jail', 'bum':
      this.winner = this.player2;
      break;
    case 'jail', 'cop':
      this.winner = this.player2;
      break;
  }

  return this.winner;
};

module.exports = {
  logic: logic
};
