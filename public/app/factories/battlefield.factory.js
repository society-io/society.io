angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http', 'socketFactory']; //injections go inside brackets

function bfFactoryFunction($http, socketFactory) {
  //flags at top and then factory, then function declarations
  var emit = socketFactory.emit;
  var on = socketFactory.on;
  var startingHealth = {
    rich: 0,
    bum: 0,
    tax: 0,
    cop: 0,
    jail: 0
  };

  var state = {
    choices: ['rich', 'bum', 'tax', 'cop', 'jail'],
    results: false,
    playerId: false,
    playerChoice: '',
    opponentId: false,
    opponentChoice: '',
    roundWinner: null,
    playerHealth: Object.assign({}, startingHealth),
    opponentHealth: Object.assign({}, startingHealth)
  };

  var factory = {
    emit: emit,
    setChoice: setChoice,
    get: get
  };

  listeners();

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

      // store the starting health as given by the server
      for (var choice in resp.startingHealth) {
        state.playerHealth[choice] += resp.startingHealth[choice];
        state.opponentHealth[choice] += resp.startingHealth[choice];
      }
    });

    on('roundResult', function(resp){
      console.log("this is the round result", resp);

      state.results = resp;
      state.opponentChoice = resp.choices[state.opponentId];
      state.roundWinner = resp.choices[resp.roundWinner];

      for (var choice in resp.health[1]) {
        state.playerHealth[choice] = resp.health[1][choice];
        state.opponentHealth[choice] = resp.health[2][choice];
      }
    });

    emit('queue');
  }

}
