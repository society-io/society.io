angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http', 'socketFactory', '$state', '$rootScope']; //injections go inside brackets

function bfFactoryFunction($http, socketFactory, $state, $rootScope) {

  socketFactory.connectSocket();

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
  var timerTracker;

  var state = {
    time: 15,
    choices: ['rich', 'bum', 'tax', 'cop', 'jail'],
    results: false,
    submitted: false,
    roundWinner: null,
    matchOver: false,
    player: false,
    opponent: false
  };

  listeners();

  return {
    emit: emit,
    setChoice: setChoice,
    get: get
  };

  function Player(id) {
    this.id = id;
    this.choice = '';
    this.health = Object.assign({}, startingHealth);
  }

  function setChoice(userChoice) {
    console.log('setChoice called. userChoice = ', userChoice);
    if (userChoice) {
      emit('choice', { choice: userChoice });
    } else {
      console.log('emitting noChoice');
      emit('noChoice');
    }

    state.player.choice = userChoice;
    state.submitted = true;
  }

  function get(name) {
    return state[name];
  }

  function boardReset() {
    state.opponentChoice = '';
    state.submitted = false;
    state.roundWinner = null;
    state.matchOver = false;
    state.playerHealth = Object.assign({}, startingHealth);
    state.opponentHealth = Object.assign({}, startingHealth);
  }

  function listeners() {

    on('gameReady', function(resp) {
      console.log('Game ready: ', resp);

      boardReset();

      // store player IDs in state
      state.player = new Player(resp.playerId);
      state.opponent = new Player(resp.playerId === 1 ? 2 : 1);

      // store the starting health as given by the server
      for (var choice in resp.startingHealth) {
        state.player.health[choice] = resp.startingHealth[choice];
        state.opponent.health[choice] = resp.startingHealth[choice];
      }

    });

    on('roundResult', function(resp){
      console.log("this is the round result", resp);

      state.time = 15;
      state.results = resp;
      state.opponentChoice = resp.choices[state.opponentId];
      state.roundWinner = resp.roundWinner;
      state.submitted = false;
      state.player.choice = '';
      state.opponent.choice = '';

      for (var choice in resp.health[1]) {
        state.player.health[choice] = resp.health[state.player.id][choice];
        state.opponent.health[choice] = resp.health[state.opponent.id][choice];
      }
    });

    on('matchResult', function(resp) {
      state.matchOver = true;
      // stopTimer();
      setTimeout(function() {
        // $state.go('lobby');
      }, 1000);
    });

    emit('newGame');
  }

}
