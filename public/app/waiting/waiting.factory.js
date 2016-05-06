(function (){
  angular
    .module('app')
    .factory('waitingFactory', waitingFactory);

    waitingFactory.$inject = ['$state','socketFactory'];

    function waitingFactory($state, socketFactory) {
    	var emit = socketFactory.emit;
		  var on = socketFactory.on;

      var playerInfo = {
      	player1Name: "Kan Adachi",
      	player1MMR: false,
      	player2Name: false,
      	player2MMR: false
      };

    	listeners();
    	return {get: get};

      function get(keyName) {
      	return playerInfo[keyName];
      }

		  function listeners() {

				// on('matchReady',function(resp){
					/*
					//insert $timeout here
					resp = {
            player1:
            player1mmr:
            player2:
            player2mmr:
					}
					*/
				// });

			}
    }


})();