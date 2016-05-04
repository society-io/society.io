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
		
		function createRoom(message) {
			emit('create room', message);
			console.log('create room event emitted!');
		}
	
		function joinRoom(message) {
			emit('join room', message);
			console.log('join room event emitted!');
		}
		
		function waitingRoom(message) {
			on('waiting room', function(){
				$state.go('/loading');
			});
		}
 
	}
