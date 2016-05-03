angular
  .module('app')
  .factory('preGameFactory', preGameFactory);

	preGameFactory.$inject = ['socketFactory', '$state'];

	function preGameFactory(socketFactory, $state) {
		var emit = socketFactory.emit;
		var on = socketFactory.on;
    listeners();

		return {
			joinQueue: joinQueue,
			newPrivateGame: newPrivateGame,
			joinPrivateGame: joinPrivateGame, 
			queueGameInit: queueGameInit, 
			privateGameInit: privateGameInit
		};
		
    function listeners() {
    	// on('matchReady', function(resp){
    	// 	console.log('match ready inside listeners, inside preGameFactory');
    	// });
    }


		function joinQueue() {
			emit('queue');
			console.log('queue event emitted!');
			$state.go('loading');
		}

		function newPrivateGame(){
			emit('newPrivateGame');
			console.log('newPrivateGame event emitted!');
		}

		function joinPrivateGame(){
			emit('joinPrivateGame');
			console.log('joinPrivateGame event emitted!');
		}
		

		function privateGameInit() {
			on('privateGameInitiated', function() {
				$state.go('/battlefield');
			});
		}
			
		function queueGameInit() {
			on('queueGameInitiated',function(){
				$state.go('/battlefield');
			});
		}
 
	}
