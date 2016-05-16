angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['socketFactory',
'battlefieldTimerFactory',
'battlefieldLogicFactory',
'$state',
'$window',
'$rootScope'];

function bfFactoryFunction(socketFactory, battlefieldTimerFactory, battlefieldLogicFactory, $state, $window, $rootScope) {

  var bfLogic = battlefieldLogicFactory;
  var bfTimer = battlefieldTimerFactory;
  var socket = socketFactory;
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
    submitted: false,
    roundWinner: null,
    matchOver: false,
    player: false,
    opponent: false,
    opponentPlayed: false,
    gameStarted: false,
    forfeited: false,
    centerMessage: ''
  };

  return {
    listeners: listeners,
    setChoice: setChoice,
    forfeit: forfeit,
    boardReset: boardReset,
    get: get
  };

  function Player(id, profile) {
    this.id = id;
    this.choice = '';
    this.roundStatus = '';
    this.profile = profile;
    this.health = Object.assign({}, startingHealth);
  }

  function setChoice(userChoice) {
    if (userChoice) {
      state.player.choice = userChoice;
      state.submitted = true;
      socket.emit('choice', { choice: userChoice });
    }
  }

  function get(name) {
    return state[name];
  }

  function boardReset() {
    state.results = false;
    state.submitted = false;
    state.roundWinner = null;
    state.matchOver = false;
    state.player = false;
    state.opponent = false;
    state.opponentPlayed = false;
    state.gameStarted = false;
    state.forfeited = false;
    state.playerHealth = Object.assign({}, startingHealth);
    state.opponentHealth = Object.assign({}, startingHealth);

    bfTimer.resetTimer();
  }

  function forfeit() {
    socket.emit('forfeit');
  }

  function listeners() {

    socket.on('gameReady', function(resp) {
      // store player IDs in state
      state.player = new Player(resp.playerId, resp.playerProfile);
      state.opponent = new Player(resp.playerId === 1 ? 2 : 1, resp.opponentProfile);

      // calculate win rates
      state.player.profile.winrate = bfLogic.calcWinRate(state.player.profile.wins, state.player.profile.losses);
      state.opponent.profile.winrate = bfLogic.calcWinRate(state.opponent.profile.wins, state.opponent.profile.losses);

      // store the starting health as given by the server
      for (var choice in resp.startingHealth) {
        state.player.health[choice] = resp.startingHealth[choice];
        state.opponent.health[choice] = resp.startingHealth[choice];
      }

      $rootScope.$broadcast('runAnimations');
    });

    socket.on('opponentPlayed', function(resp) {
      state.opponentPlayed = true;
    });

    socket.on('roundResult', function(resp){
      console.log("roundResult: ", resp);

      bfTimer.resetTimer();
      bfTimer.stopTimer();

      state.results = resp;
      state.opponent.choice = resp.choices[state.opponent.id];

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

    socket.on('newRound', function() {
      if (!state.gameStarted) {
        state.gameStarted = true;
      }

      console.log('newRound! Starting Game...');

      // reset state items for next round
      state.submitted = false;
      state.player.choice = '';
      state.player.roundStatus = '';
      state.opponent.choice = '';
      state.opponent.roundStatus = '';
      state.opponentPlayed = false;
      state.roundWinner = null;

      bfTimer.startTimer().then(function() {
        console.log('state.player.choice = ', state.player.choice);
        if (!state.player.choice) {
          state.player.choice = 'noChoice';
          socket.emit('noChoice');
          console.log('Emitted: noChoice');
        }
      });
    });

    socket.on('matchResult', function(resp) {
      state.matchOver = true;
      state.centerMessage = 'Game Over! Headed to lobby...';

      setTimeout(function() {
        $state.go('lobby');
      }, 3000);
    });

    socket.on('forfeitedResults', function(resp) {
      bfTimer.stopTimer();
      state.forfeited = true;
      state.matchOver = true;
      state.roundWinner = resp.winner;
      if (state.player.id === resp.winner) {
        state.centerMessage = 'Opponent Forfeited. Redirecting to lobby...';
      } else {
        state.centerMessage = 'You forfeited the match. Redirecting to lobby...';
      }
      setTimeout(function() {
        $state.go('lobby');
      }, 3000);
    });


    socket.on('matchTerminated', function(resp) {
      if (resp.reason === 'playerDisconnected') {
        bfTimer.stopTimer();
        state.forfeited = true;
        state.matchOver = true;
        state.roundWinner = state.player.id;
        state.centerMessage = 'Opponent Disconnected. Redirecting to lobby...';

        setTimeout(function() {
          $state.go('lobby');
        }, 3000);
      }
    });
  }

}
