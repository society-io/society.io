angular
  .module('app')
  .factory('lobbyFactory', lobbyFactory);

	lobbyFactory.$inject = ['$state'];

	function lobbyFactory($state) {
		
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
