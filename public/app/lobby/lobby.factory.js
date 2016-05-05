angular
  .module('app')
  .factory('lobbyFactory', lobbyFactory);

	lobbyFactory.$inject = ['socketFactory', '$state'];

	function lobbyFactory(socketFactory, $state) {
		var emit = socketFactory.emit;
		var on = socketFactory.on;

		return {
			joinQueue: joinQueue,
			addedToQueue: addedToQueue,
			createRoom: createRoom,
			joinRoom: joinRoom,
		};

		function joinQueue(message) {
			emit('queue', message);
			console.log('queue event emitted!');
		}

		function addedToQueue() {
			on('added to queue', function() {
				$state.go('/loading');
			});
		}

		function createRoom(joinCode) {
			emit('create room', {joinCode: joinCode});
			console.log('create room event emitted!');
		}

		function joinRoom() {
			emit('join room');
			console.log('join room event emitted!');
		}

		function waitingRoom(message) {
			on('waiting room', function(){
				$state.go('/loading');
			});
		}

	}
