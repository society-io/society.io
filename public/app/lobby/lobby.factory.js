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
			joinRoom: joinRoom,
			get: get,
			set: set
		};

		function joinRoom(joinCode) {
			if (joinCode === undefined || joinCode.length < 3) {
				state.joinCodeErrorMessage2 = 'Minimum 3 characters required!';
				return;
			}
			state.tempJoinCode = joinCode;
			emit('join private game', {joinCode: joinCode});
		}

		function get(key){
			return state[key];
		}

		function set(key, value){
			state[key] = value;
		}

	}
