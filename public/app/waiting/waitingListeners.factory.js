(function (){
  angular
    .module('app')
    .factory('waitingListenersFactory', waitingListenersFactory);

    waitingListenersFactory.$inject = ['socketFactory', 'waitingFactory', '$state', '$timeout'];

    function waitingListenersFactory(socketFactory, waitingFactory, $state, $timeout) {

      var socket = socketFactory;
      var waiting = waitingFactory;

      return {
        init: init
      };

      // -----------------------
      // waiting room listeners

      function init() {
        if (!socket.isConnected()) {
          console.error('socket is not connected. Can\'t set up lobby listeners');
          return;
        }

        socket.on('profile', profile);
        socket.on('match ready', matchReady);
        socket.on('join code to initialize battlefield', joinCodeToInitBf);
      }

      function profile(resp) {
        // event: 'profile'
        waiting.set('player1', resp.p1);
        waiting.set('player2', resp.p2);
        waiting.set('waiting', false);
      }

      function matchReady() {
        // event: 'match ready'
        waiting.set('centerMessage', 'Opponent Found.');

        $timeout(function() {
          waiting.set('centerMessage', 'Entering Battlefield...');
        }, 2500);

        $timeout(function() {
          $state.go('battlefield');
        }, 5000);
      }

      function joinCodeToInitBf(data) {
        // event: join code to initialize battlefield
        socket.emit('initialize battlefield', data);
      }

    }

})();
