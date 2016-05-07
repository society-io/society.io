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
			waitingRoom: waitingRoom,
			battlefield: battlefield
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
			on('room created', function(data){
			  $state.go('waiting');
			});
			emit('create room', {joinCode: joinCode});
			console.log('create room event emitted!');
			$state.go('loading');
		}

		function joinRoom(joinCode) {
			on('room exists', function(data){
			  if(data.success) {
			    $state.go('waiting');
			  } else {
			    $state.go('lobby');
			  }
			});
			emit('join room', {joinCode: joinCode});
			console.log('join room event emitted!');
			$state.go('loading');
		}

		function waitingRoom() {
			on('room created', function(data){
				$state.go('waiting');
			});
			on('room exists', function(data){
				if(data.success) {
					$state.go('waiting');
				} else {
					$state.go('lobby');
				}
			});
		}

		function battlefield() {
			on('match ready', function(){
				$state.go('Battlefield');
			});
		}

	}
