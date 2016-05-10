angular
  .module('app')
  .factory('lobbyFactory', lobbyFactory);

	lobbyFactory.$inject = ['socketFactory', '$state'];

	function lobbyFactory(socketFactory, $state) {
		var emit = socketFactory.emit;
		var on = socketFactory.on;
		var state = {
			joinCodeErrorMessage: '',
			joinQueueErrorMessage: '',
			whereTo: null,
			player: {}
		};

		return {
			joinQueue: joinQueue,
			createRoom: createRoom,
			joinRoom: joinRoom,
			get: get,
			getPlayer: getPlayer
		};

		function joinQueue(message) {
			on('player already in queue', function(data){
				$state.go('lobby');
				state.joinQueueErrorMessage = '';
				state.joinQueueErrorMessage += 'User already in queue.';
			});
			on('added to queue', function() {
				state.whereTo = 'queue';
				$state.go('waiting');
			});
			$state.go('loading');
			emit('queue', message);
			console.log('Emitted: joinQueue');
		}

		function createRoom(joinCode) {
			if (joinCode === undefined || joinCode.length < 3) {
				state.joinCodeErrorMessage = '';
				state.joinCodeErrorMessage += 'Minimum of 3 characters required.';
				return;
			}

			on('err', function(data){
				state.joinCodeErrorMessage = '';
				state.joinCodeErrorMessage += data.message;
			});

			on('private game created', function(data){
				state.whereTo = 'private';
			  $state.go('waiting');
			});

			emit('create private game', {joinCode: joinCode});
			console.log('Emitted: create privateGame');
			$state.go('loading');
		}

		function joinRoom(joinCode) {
			if (joinCode === undefined || joinCode.length < 3) {
				state.joinCodeErrorMessage = '';
				state.joinCodeErrorMessage += 'Minimum of 3 characters required.';
				return;
			}
			on('private game exists', function(data){
			  if(data.success) {
			  	state.whereTo = 'private';
			    $state.go('waiting');
			  } else {
			    $state.go('lobby');
			  }
			});

			emit('attempt to join private game', {joinCode: joinCode});
			console.log('Emitted: join privateGame');
			$state.go('loading');
		}

		function get(key){
			return state[key];
		}

		function getPlayer() {
			console.log('running getPlayer');
      on('you are', function(resp) {
        console.log('this is resp hi', resp);
        state.player = resp;
      });
      emit('who am i');
		}

	}
