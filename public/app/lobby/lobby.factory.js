angular
  .module('app')
  .factory('lobbyFactory', lobbyFactory);

	lobbyFactory.$inject = ['socketFactory', '$state'];

	function lobbyFactory(socketFactory, $state) {
		var emit = socketFactory.emit;
		var on = socketFactory.on;
		var state = {
			joinCodeErrorMessage: '',
			joinCodeErrorMessage2: '',
			joinQueueErrorMessage: '',
			whereTo: null,
			player: {},
			joinCode: '',
			avatar: '',
			tempAvatar: '',
			tempJoinCode: ''
		};

		return {
			joinQueue: joinQueue,
			createRoom: createRoom,
			joinRoom: joinRoom,
			getPlayer: getPlayer,
			get: get,
			set: set
		};

		function joinQueue(message) {
			emit('queue', message);
			console.log('Emitted: joinQueue');
		}

		function createRoom(joinCode) {

			if (joinCode === undefined || joinCode.length < 3) {
				state.joinCodeErrorMessage ='Minimum of 3 characters required.';
				return;
			}

			state.tempJoinCode = joinCode;

			emit('create private game', {joinCode: joinCode.toLowerCase()});
			console.log('Emitted: create privateGame');
		}

		function joinRoom(joinCode) {
			if (joinCode === undefined || joinCode.length < 3) {
				state.joinCodeErrorMessage2 = 'Minimum 3 characters required!';
				return;
			}
			state.tempJoinCode = joinCode;
			emit('join private game', {joinCode: joinCode});
		}

		function getPlayer() {
			console.log('running getPlayer');
      emit('who am i');
		}
		function get(key){
			return state[key];
		}

		function set(key, value){
			state[key] = value;
		}

	}
