(function() {

  angular
    .module('app')
    .controller('AppController', appController);

  appController.$inject = [
    '$scope',
    '$state',
    '$window',
    '$timeout',
    'socketFactory',
    'lobbyListenersFactory',
    'waitingListenersFactory',
    'lobbyFactory'
  ];

  function appController($scope, $state, $window, $timeout, socketFactory, lobbyListenersFactory, waitingListenersFactory, lobbyFactory) {
    var emit = socketFactory.emit;
    var on = socketFactory.on;

    var lobbyListeners = lobbyListenersFactory;
    var socket = socketFactory;

    var lobby = lobbyFactory;

    var vm = this;
    vm.bodyClasses = 'default';

    function goToLobby() {
      $state.go('lobby');
      console.log('Called go to lobby! Reloading now.');
      $timeout(function() {
        $window.location.reload();
      }, 0);
    }

    // this'll be called on every state change in the app
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

      if (toState.name === 'lobby') {
        socket.connectSocket().then(function() {
          console.log('initializing listeners');
          lobbyListeners.init();
          socket.emit('who am i');
        });
      }

      if (toState.name === 'waiting') {
        if (!socket.isConnected()) {
          console.error('no socket connection is set up. Something went wrong.');
          return;
        }

        waitingListenersFactory.init();
      }

      function moving(comingFrom, goingTo) {
        return fromState.name === comingFrom && toState.name === goingTo;
      }

      console.log('state change =========');
      console.log('to: ', toState.name);
      console.log('from: ', fromState.name);
      console.log('======================');

      if (toState.name !== 'auth' && toState.name !== 'lobby') {
        if (!socketFactory.isConnected()) {
          goToLobby();
        }
      }

      if (moving('lobby', 'battlefield')) {
        goToLobby();
      }

      if (moving('battlefield', 'lobby')) {
        goToLobby();
      } 

      // if (fromState.name === 'battlefield' && toState.name === 'lobby') {
      //   $window.location.reload();
      // }

      if ((fromState.name === '' && toState.name === 'waiting') || 
          (fromState.name === '' && toState.name === 'battlefield') ||
          (fromState.name === 'waiting' && toState.name === 'lobby') ||
          (fromState.name === 'battlefield' && toState.name !== 'lobby')
        ) {
        console.log('inside of invalid state change.');
        console.log('state change =========');
        console.log('to: ', toState.name);
        console.log('from: ', toState.name);
        console.log('======================');
        goToLobby();
      }

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
