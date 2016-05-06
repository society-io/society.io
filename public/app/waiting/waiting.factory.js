(function (){
  angular
    .module('app')
    .factory('waitingFactory', waitingFactory);

    waitingFactory.$inject = ['socketFactory', '$state'];

    function waitingFactory(socketFactory, $state) {
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
        cancelRoom: cancelRoom
      };

      function get(keyName) {
      	return playerInfo[keyName];
      }

      function cancelRoom(joinCode) {
        // Send the Server Your Game's joinCode
        emit('cancel room', {joinCode: joinCode});
        $state.go('lobby');
      }

		  function listeners() {
        emit('who am i');

        on('you are', function(resp) {
          playerInfo.player1Name = resp.name;
          playerInfo.player1MMR = resp.mmr;
        });

        on('matchReady', function(resp) {
          playerInfo.player2Name = resp.name;
          playerInfo.player2MMR = resp.name;
          $timeout(function(){
            $state.go('battlefield');
          }, 5000);
        });
			}
    }


})();