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
			get: get,
			set: set
		};

		function get(key){
			return state[key];
		}

		function set(key, value){
			state[key] = value;
		}

	}
