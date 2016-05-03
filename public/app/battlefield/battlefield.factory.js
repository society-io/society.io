angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http', 'socketFactory', '$state', '$rootScope']; //injections go inside brackets

function bfFactoryFunction($http, socketFactory, $state, $rootScope) {
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




  //var player = new player(1);
  //var opponent = new player(2);
  function Player(id) {
    this.id = id;
    this.choice = '';
    health = Object.assign({}, startingHealth);
  }

  function setChoice(userChoice) {
    console.log('setChoice called. userChoice = ', userChoice);
    if (userChoice) {
      emit('choice', { choice: userChoice });
    } else {
      console.log('emitting noChoice');
      emit('noChoice');
    }

    state.playerChoice = userChoice;
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

  function startTimer() {
    timerTracker = setInterval(function() {
      state.time--;
      console.log('state.time = ', state.time);
      $rootScope.$apply();
      if (state.time === 0) {
        stopTimer();
        if (!state.submitted) {
          setChoice();
        }
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerTracker);
  }

  function listeners() {

    on('gameReady', function(resp) {
      console.log('Game ready: ', resp);

      boardReset();
      // store player IDs in state
      state.playerId = resp.playerId;
      state.opponentId = (resp.playerId === 1) ? 2 : 1;

      // store the starting health as given by the server
      for (var choice in resp.startingHealth) {
        state.playerHealth[choice] += resp.startingHealth[choice];
        state.opponentHealth[choice] += resp.startingHealth[choice];
      }

      startTimer();
    });

    on('roundResult', function(resp){
      console.log("this is the round result", resp);

      state.time = 15;
      state.results = resp;
      state.opponentChoice = resp.choices[state.opponentId];
      state.roundWinner = resp.choices[resp.roundWinner];
      state.submitted = false;

      for (var choice in resp.health[1]) {
        state.playerHealth[choice] = resp.health[state.playerId][choice];
        state.opponentHealth[choice] = resp.health[state.opponentId][choice];
      }

      stopTimer();
      startTimer();
    });

    on('matchResult', function(resp) {
      state.matchOver = true;
      stopTimer();
      setTimeout(function() {
        // $state.go('lobby');
      }, 1000);
    });

  }

}