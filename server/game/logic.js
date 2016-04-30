var evalRound = function(choice1, choice2) {
  var result;

  console.log('choice1 = ', choice1);
  console.log('choice2 = ', choice2);

  switch (choice1 + '|' + choice2) {
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
    case 'rich|taxes':
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

module.exports = {
  evalRound: evalRound
};
