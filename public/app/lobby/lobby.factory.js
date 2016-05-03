angular
  .module('app')
  .factory('lobbyFactory', lobbyFactory);

	lobbyFactory.$inject = ['socketFactory', '$state'];

	function lobbyFactory(socketFactory, $state) {
		var emit = socketFactory.emit;
		var on = socketFactory.on;

		return {
			joinQueue: joinQueue,
			newPrivateGame: newPrivateGame,
			joinPrivateGame: joinPrivateGame, 
			queueGameInit: queueGameInit, 
			privateGameInit: privateGameInit
		};
		
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
