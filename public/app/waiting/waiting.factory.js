(function (){
  angular
    .module('app')
    .factory('waitingFactory', waitingFactory);

    waitingFactory.$inject = ['socketFactory', '$state', '$timeout'];

    function waitingFactory(socketFactory, $state, $timeout) {
    	var emit = socketFactory.emit;
		  var on = socketFactory.on;
      var matchJoinCode = null;

      var playerInfo = {
      	player1Name: null,
      	player1MMR: null,
      	player2Name: null,
      	player2MMR: null
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

        on('private match ready', function() {
          console.log('inside private match ready');
          $state.go('battlefield');
        });

        on('here is joinCode', function(data){
          console.log('inside hereIsJoinCode listener within waitingFactory, joinCode: ', data.joinCode);
          matchJoinCode = data.joinCode;
          emit('joined room', {joinCode: matchJoinCode});
        });
			}

    }


})();