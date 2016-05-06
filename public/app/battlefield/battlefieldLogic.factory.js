angular
  .module('app')
  .factory('battlefieldLogicFactory', bfLogicFactoryFunction);

bfLogicFactoryFunction.$inject = [];

function bfLogicFactoryFunction() {

  return {
    winsAgainst: winsAgainst,
    losesAgainst: losesAgainst
  };

  function winsAgainst(choice) {

    var result;

    switch (choice) {

      /**
       *  rich
       *  Beats: bum, cop
       */
      case 'rich':
        result = ['bum', 'cop'];
        break;

      /**
       *  bum
       *  Beats: jail, tax
       */
      case 'bum':
        result = ['jail', 'tax'];
        break;

      /**
       *  tax
       *  Beats: cop, rich
       */
      case 'tax':
        result = ['cop', 'rich'];
        break;

      /**
       *  cop
       *  Beats: jail, bum
       */
      case 'cop':
        result = ['jail', 'bum'];
        break;

      /**
       *  jail
       *  Beats: rich, tax
       */
      case 'jail':
        result = ['rich', 'tax'];
        break;
    }

    return result;
  }

  function losesAgainst(choice) {

    var result;

    switch (choice) {

      /**
       *  rich
       *  Beats: bum, cop
       */
      case 'rich':
        result = ['jail', 'tax'];
        break;

      /**
       *  bum
       *  Beats: jail, tax
       */
      case 'bum':
        result = ['cop', 'rich'];
        break;

      /**
       *  tax
       *  Beats: cop, rich
       */
      case 'tax':
        result = ['jail', 'bum'];
        break;

      /**
       *  cop
       *  Beats: jail, bum
       */
      case 'cop':
        result = ['rich', 'tax'];
        break;

      /**
       *  jail
       *  Beats: rich, tax
       */
      case 'jail':
        result = ['bum', 'cop'];
        break;
    }

    return result;
  }
}
