(function (){
  angular
    .module('app')
    .factory('waitingFactory', waitingFactory);

    waitingFactory.$inject = ['socketFactory', '$state', '$timeout'];

    function waitingFactory(socketFactory, $state, $timeout) {
      var emit = socketFactory.emit;
      var on = socketFactory.on;

      var playerInfo = {
        player1Name: null,
        player1MMR: null,
        player2Name: null,
        player2MMR: null
      };

      if (socketFactory.isConnected()) {
        console.log('socket connected = ', socketFactory.isConnected());
        listeners();
      }

      return {
        get: get,
        cancelRoom: cancelRoom,
        removeFromQueue: removeFromQueue
      };

      function get(keyName) {
        return playerInfo[keyName];
      }

      function cancelRoom(joinCode) {
        console.log('Canceling privateGame...');
        emit('cancel room', {joinCode: joinCode});
        $state.go('lobby');
      }

      function removeFromQueue() {
        console.log('Removing From Queue...');
        emit('remove from queue');
        $state.go('lobby');
      }

      function listeners() {
        on('profile', function(resp){
          playerInfo.player1Name = resp.player1.username;
          playerInfo.player1MMR = resp.player1.mmr;
          playerInfo.player2Name = resp.player2.username;
          playerInfo.player2MMR = resp.player2.mmr;
        });

        on('match ready', function() {
          $timeout(function(){
            $state.go('battlefield');
          }, 5000);
        });

        on('join code to initialize battlefield', function(data){
          console.log('joinCode: ', data.joinCode);
          emit('initialize battlefield', {joinCode: data.joinCode});
        });

        on('player 1 enter battlefield', function() {
          console.log('inside player1EnterBattlefield');
          $state.go('battlefield');
        });

        on('player 2 enter battlefield', function() {
          console.log('inside player2EnterBattlefield');
          $state.go('battlefield');
        });
      }

    }


})();
