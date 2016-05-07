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
			joinRoom: joinRoom
		};

		function joinQueue(message) {
			$state.go('loading');
			on('added to queue', function() {
				$state.go('waiting');
			});
			emit('queue', message);
			console.log('queue event emitted!');
		}

		function addedToQueue() {
			on('added to queue', function() {
				$state.go('waiting');
			});
		}

		function createRoom(joinCode) {
			on('private game created', function(data){
			  $state.go('waiting');
			});
			emit('create private game', {joinCode: joinCode});
			console.log('createPrivateGame event emitted!');
			$state.go('loading');
		}

		function joinRoom(joinCode) {
			on('private game exists', function(data){
        console.log('inside roomExists listener within lobbyFactory, data: ', data.success);
			  if(data.success) {
			    $state.go('waiting');
			  } else {
			    $state.go('lobby');
			  }
			});
			emit('attempt to join private game', {joinCode: joinCode});
			console.log('join room event emitted!');
			$state.go('loading');
		}

	}
