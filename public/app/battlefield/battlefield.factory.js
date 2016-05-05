angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http', 'socketFactory', 'battlefieldTimerFactory', '$state'];

function bfFactoryFunction($http, socketFactory, battlefieldTimerFactory, $state) {

  socketFactory.connectSocket();

  var bfTimer = battlefieldTimerFactory;

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
    time: 15,
    choices: ['rich', 'bum', 'tax', 'cop', 'jail'],
    results: false,
    submitted: false,
    roundWinner: null,
    matchOver: false,
    player: false,
    opponent: false,
    gameStarted: false,
    centerMessage: 'Game starting in a few seconds...'
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
    this.roundStatus = '';
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
    state.opponent.choice = '';
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

      emit('clientGameReady');
    });

    on('roundResult', function(resp){
      console.log("this is the round result", resp);

      bfTimer.resetTimer();
      bfTimer.stopTimer();

      state.results = resp;
      state.opponent.choice = resp.choices[state.opponent.id];
      state.centerMessage = 'Waiting for next round...';

      // identify winner/loser for DOM
      state.roundWinner = resp.roundWinner;

      if (resp.roundWinner === state.player.id) {
        state.player.roundStatus = 'Win';
        state.opponent.roundStatus = 'Lose';

      } else if (resp.roundWinner === state.opponent.id) {
        state.player.roundStatus = 'Lose';
        state.opponent.roundStatus = 'Win';

      } else {
        state.player.roundStatus =  state.opponent.roundStatus = 'Tie';
      }

      for (var choice in resp.health[1]) {
        state.player.health[choice] = resp.health[state.player.id][choice];
        state.opponent.health[choice] = resp.health[state.opponent.id][choice];
      }

    });

    on('newRound', function() {
      if (!state.gameStarted) {
        state.gameStarted = true;
      }

      console.log('new round heard');

      // reset state items for next round
      state.submitted = false;
      state.player.choice = '';
      state.opponent.choice = '';
      state.roundWinner = null;

      bfTimer.startTimer();
    });

    on('matchResult', function(resp) {
      state.matchOver = true;
      state.centerMessage = 'Game Over! Headed to lobby...';
      setTimeout(function() {
        $state.go('lobby');
      }, 3000);
    });

    emit('newGame');
  }

}
