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

      if (socketFactory.isConnected()) {
        console.log('socket connected = ', socketFactory.isConnected());
        listeners();
      }

      return {
        get: get,
        cancelRoom: cancelRoom
      };

      function get(keyName) {
        return state[keyName];
      }

      function cancelRoom(joinCode) {
        console.log('Canceling privateGame...');
        emit('cancel private game', {joinCode: joinCode});
        $state.go('lobby');
      }

      function listeners() {
        console.log('running listeners inside waiting factory');
     
        on('profile', function(resp){
	        console.log('ON PROFILE');
          console.log('resp = ', resp);

          state.player1 = resp.p1;
          state.player2 = resp.p2;

          state.waiting = false;
        });

        on('match ready', function() {
          console.log('ON MATCH READY --> GO TO BF');
          state.centerMessage = 'Opponent Found.';
          $timeout(function() {
            state.centerMessage = 'Entering Battlefield...';
          }, 2500);
          $timeout(function() {
          console.log('$TIMEOUT MATCH READY ABOUT TO GO TO BF');
	          $state.go('battlefield');
          }, 5000);
        });

        on('join code to initialize battlefield', function(data){
          console.log('joinCode: ', data.joinCode);
          emit('initialize battlefield', {joinCode: data.joinCode});
        });
      }

    }


})();
