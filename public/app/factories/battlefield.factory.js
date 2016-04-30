angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http', 'socketFactory']; //injections go inside brackets

function bfFactoryFunction($http, socketFactory) {
  //flags at top and then factory, then function declarations
  var emit = socketFactory.emit;
  var on = socketFactory.on;

  listeners();

  var state = {
    choices: ['rich', 'bum', 'tax', 'cop', 'jail'],
    results: false,
    playerId: false,
    opponentId: false,
    playerChoice: '',
    opponentChoice: '',
    winner: null
  };

  var factory = {
    emit: emit,
    setChoice: setChoice,
    get: get
  };

  return factory;

  function setChoice(userChoice) {
    emit('choice', {choice: userChoice});
    state.playerChoice = userChoice;
  }

  function get(name) {
    return state[name];
  }

  function listeners() {
    on('gameReady', function(resp) {
      console.log('Game ready: ', resp);

      // store player IDs in state
      state.playerId = resp.playerId;
      state.opponentId = (resp.playerId === 1) ? 2 : 1;
    });

    on('roundResult', function(resp){
        console.log("this is the round result", resp);

        state.results = resp;
        state.opponentChoice = resp.choices[state.opponentId];
        state.winner = resp.choices[resp.winner];
        console.log('state.winner = ', state.winner);
    });

    emit('queue');
  }

}
