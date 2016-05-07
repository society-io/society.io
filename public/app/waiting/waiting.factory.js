(function (){
  angular
    .module('app')
    .factory('waitingFactory', waitingFactory);

    waitingFactory.$inject = ['socketFactory', '$state', '$timeout'];

    function waitingFactory(socketFactory, $state, $timeout) {
    	var emit = socketFactory.emit;
		  var on = socketFactory.on;

      var playerInfo = {
      	player1Name: false,
      	player1MMR: false,
      	player2Name: false,
      	player2MMR: false
      };

    	listeners();
    	return {
        get: get,
        cancelRoom: cancelRoom,
        removeFromQueue: removeFromQueue
      };

      function get(keyName) {
      	return playerInfo[keyName];
      }

      function cancelRoom(joinCode) {
        // Send the Server Your Game's joinCode
        emit('cancel room', {joinCode: joinCode});
        $state.go('lobby');
      }

      function removeFromQueue() {
        console.log('leaving the q');
        emit('remove from queue');
      }

		  function listeners() {
        emit('who am i');

        on('you are', function(resp) {
          playerInfo.player1Name = resp.name;
          playerInfo.player1MMR = resp.mmr;
        });

        on('match ready', function() {
          console.log('inside match ready');
          // playerInfo.player2Name = resp.name;
          // playerInfo.player2MMR = resp.name;
          $state.go('battlefield');
        });
			}
    }


})();