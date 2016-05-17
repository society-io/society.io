(function() {

  angular
    .module('app')
    .controller('AppController', appController);

  appController.$inject = [
    '$scope',
    '$state',
    '$window',
    '$timeout',
    'authFactory',
    'socketFactory',
    'statsFactory',
    'lobbyFactory',
    'lobbyListenersFactory',
    'waitingListenersFactory',
    'waitingFactory',
    'battlefieldFactory',
    'chatFactory'
  ];

  function appController($scope, $state, $window, $timeout, authFactory, socketFactory, statsFactory, lobbyFactory, lobbyListenersFactory, waitingListenersFactory, waitingFactory, battlefieldFactory, chatFactory) {
    var emit = socketFactory.emit;
    var on = socketFactory.on;

    var lobbyListeners = lobbyListenersFactory;
    var socket = socketFactory;

    var lobby = lobbyFactory;

    var vm = this;
    vm.bodyClasses = 'default';

    function goToLobby() {
      $state.go('lobby');
    }

    // this'll be called on every state change in the app
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

        console.log('state change =========');
        console.log('to: ', toState.name);
        console.log('from: ', fromState.name);
        console.log('======================');

      if (toState.data.authenticate) {
        if (!authFactory.isAuthed()) {
          $state.go('auth');
          return;
        }
      }

      if (toState.name === 'lobby') {
        lobbyFactory.reset();
        socket.disconnect();
        socket.connectSocket().then(function() {
          lobbyListeners.init();
          chatFactory.chatListeners();
          battlefieldFactory.boardReset();
          socket.emit('who am i');
          statsFactory.getBoard();
        });
      }

      if (toState.name === 'waiting') {

        if (!lobbyFactory.get('waiting')) {
          goToLobby();
          return;
        }

        if (fromState.name !== 'lobby') {
          goToLobby();
          return;
        }

        if (!socket.isConnected()) {
          console.error('toState.name: waiting // No socket connection is set up. Something went wrong.');
          $state.go('lobby');
          return;
        }

        waitingListenersFactory.init();
      }

      if (toState.name === 'battlefield') {
        if (fromState.name !== 'waiting') {
          goToLobby();
          return;
        }

        if (!socketFactory.isConnected()) {
          console.error('toState.name: battlefield // No socket connection is set up. Something went wrong.');
          $state.go('lobby');
          return;
        }

        battlefieldFactory.listeners();

        angular.element(document).ready(function() {
          $timeout(function() {
            console.log('Emitted: clientReady');
            socketFactory.emit('client ready');
          }, 2000);
        });
      }

      if (fromState.name === 'waiting') {
        waitingFactory.reset();
      }

      if (fromState.name === 'lobby') {
        lobbyFactory.reset();
      }

      if (fromState.name === 'battlefield') {
        battlefieldFactory.boardReset();
      }

      // function moving(comingFrom, goingTo) {
      //   return fromState.name === comingFrom && toState.name === goingTo;
      // }

      // console.log('state change =========');
      // console.log('to: ', toState.name);
      // console.log('from: ', fromState.name);
      // console.log('======================');

      // if (toState.name !== 'auth' && toState.name !== 'lobby') {
      //   if (!socketFactory.isConnected()) {
      //     goToLobby();
      //   }
      // }

      // if (moving('lobby', 'battlefield')) {
      //   goToLobby();
      // }

      // if (moving('battlefield', 'lobby')) {
      //   goToLobby();
      // }

      // // if (fromState.name === 'battlefield' && toState.name === 'lobby') {
      // //   $window.location.reload();
      // // }

      // if ((fromState.name === '' && toState.name === 'waiting') ||
      //     (fromState.name === '' && toState.name === 'battlefield') ||
      //     (fromState.name === 'waiting' && toState.name === 'lobby') ||
      //     (fromState.name === 'battlefield' && toState.name !== 'lobby')
      //   ) {
      //   console.log('inside of invalid state change.');
      //   console.log('state change =========');
      //   console.log('to: ', toState.name);
      //   console.log('from: ', toState.name);
      //   console.log('======================');
      //   goToLobby();
      // }

      if (angular.isDefined(toState.data)) {
        if (angular.isDefined(toState.data.bodyClasses)) {
          vm.bodyClasses = toState.data.bodyClasses;
          return;
        }
      }

      vm.bodyClasses = 'default';
    });
  }

})();
