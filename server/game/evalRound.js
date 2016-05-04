var evalRound = function(choice1, choice2) {
  var result;

  if (choice1 === 'noChoice' && choice2 === 'noChoice') {
    return 0;
  } else if (choice1 === 'noChoice') {
    return 2;
  } else if (choice2 === 'noChoice') {
    return 1;
  }

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

module.exports = evalRound;
