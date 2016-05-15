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
        cancelRoom: cancelRoom
      };

      function get(keyName) {
        return state[keyName];
      }

      function set(key, value) {
        state[key] = value;
      }

      function cancelRoom(joinCode) {
        console.log('Canceling privateGame...');
        emit('cancel private game', {joinCode: joinCode});
        $state.go('lobby');
      }

    }


})();
