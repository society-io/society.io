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
    choices: ['rich', 'bum', 'tax', 'cop', 'jail'],
    time: 15,
    results: false,
    submitted: false,
    roundWinner: null,
    matchOver: false,
    player: false,
    opponent: false,
    gameStarted: false,
    forfeited: false,
    centerMessage: 'Game starting in a few seconds...'
  };

  listeners();

  return {
    emit: emit,
    setChoice: setChoice,
    forfeit: forfeit,
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
      console.error('userChoice is not defined!');
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

  function forfeit() {
    emit('forfeit');
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
        state.player.roundStatus = 'Winner';
        state.opponent.roundStatus = 'Loser';

      } else if (resp.roundWinner === state.opponent.id) {
        state.player.roundStatus = 'Loser';
        state.opponent.roundStatus = 'Winner';

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
      state.player.roundStatus = '';
      state.opponent.choice = '';
      state.opponent.roundStatus = '';
      state.roundWinner = null;

      bfTimer.startTimer().then(function() {
        console.log('state.player.choice = ', state.player.choice);
        if (!state.player.choice) {
          console.log('emitting no choice.');
          emit('noChoice');
        }
      });
    });

    on('matchResult', function(resp) {
      state.matchOver = true;
      state.centerMessage = 'Game Over! Headed to lobby...';
      setTimeout(function() {
        $state.go('lobby');
      }, 3000);
    });

    on('forfeitedResults', function(resp) {
      bfTimer.stopTimer();
      state.forfeited = true;
      state.matchOver = true;
      state.roundWinner = resp.winner;
      if (state.player.id === resp.winner) {
        state.centerMessage = 'Looks like the other player forfeited. Redirecting to lobby...';
      } else {
        state.centerMessage = 'You forfeited the match. Redirecting to lobby...';
      }
      setTimeout(function() {
        $state.go('lobby');
      }, 3000);
    });

    // this line is for debugging game purposes only. Safe to ignore.
    emit('newGame');
  }

}
