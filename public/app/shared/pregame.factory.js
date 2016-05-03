angular
  .module('app')
  .factory('preGameFactory', preGameFactory);

	preGameFactory.$inject = ['socketFactory', '$state'];

	function preGameFactory(socketFactory, $state) {
		var emit = socketFactory.emit;
		var on = socketFactory.on;

		return {
			joinQueue: joinQueue,
			newPrivateGame: newPrivateGame,
			joinPrivateGame: joinPrivateGame
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
 
	}
