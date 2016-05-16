(function (){
  angular
    .module('app')
    .factory('waitingFactory', waitingFactory);

    waitingFactory.$inject = ['socketFactory', '$state', '$timeout'];

    function waitingFactory(socketFactory, $state, $timeout) {
      var emit = socketFactory.emit;
      var on = socketFactory.on;

      var state = {
        player1: null,
        player2: null,
        centerMessage: 'Waiting for opponent',
        waiting: true
      };

      return {
        set: set,
        get: get,
        reset: reset
      };

      function get(key) {
        return state[key];
      }

      function set(key, value) {
        state[key] = value;
      }

      function reset() {
        state.player1 = null;
        state.player2 = null;
        state.centerMessage = 'Waiting for opponent';
        state.waiting = true;
      }

    }


})();
