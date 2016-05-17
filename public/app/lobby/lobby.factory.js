angular
  .module('app')
  .factory('lobbyFactory', lobbyFactory);

	lobbyFactory.$inject = ['$state'];

	function lobbyFactory($state) {

		var state = {
			renderMessage: '',
			joinCodeErrorMessage: '',
			joinCodeErrorMessage2: '',
			joinQueueErrorMessage: '',
			whereTo: null,
			player: {},
			joinCode: '',
			avatar: '',
			tempAvatar: '',
			tempJoinCode: '',
			waiting: false
	};

		return {
			get: get,
			set: set,
			reset: reset
		};

		function reset() {
			console.log('reset was called inside lobby factory');
			state.joinCodeErrorMessage = '';
			state.joinCodeErrorMessage2 = '';
			state.joinQueueErrorMessage = '';
			state.tempAvatar = '';
			state.tempJoinCode = '';
			state.waiting = false;
		}

		function get(key){
			return state[key];
		}

		function set(key, value){
			state[key] = value;
		}

	}
