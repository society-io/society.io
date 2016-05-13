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
			tempAvatar: ''
		};

		return {
			joinQueue: joinQueue,
			createRoom: createRoom,
			joinRoom: joinRoom,
			getPlayer: getPlayer,
			setNewAvatar: setNewAvatar,
			updateAvatar: updateAvatar,
			get: get,
			set: set
		};

		function joinQueue(message) {

			on('player already in queue', function(data){
				state.joinQueueErrorMessage = 'User already in queue.';
			});

			on('added to queue', function() {
				state.whereTo = 'queue';
				$state.go('waiting');
			});

			emit('queue', message);
			console.log('Emitted: joinQueue');
		}

		function createRoom(joinCode) {

			if (joinCode === undefined || joinCode.length < 3) {
				state.joinCodeErrorMessage ='Minimum of 3 characters required.';
				return;
			}

			on('join code invalid', function(data){
				state.joinCodeErrorMessage = data.message;
			});


			on('join code added', function(){
				state.whereTo = 'private';
				state.joinCode = joinCode;
			  $state.go('waiting');
			});

			emit('create private game', {joinCode: joinCode.toLowerCase()});
			console.log('Emitted: create privateGame');
		}

		function joinRoom(joinCode) {

			if (joinCode === undefined || joinCode.length < 3) {
				state.joinCodeErrorMessage2 = 'Minimum 3 characters required!';
				return;
			}

			on('join code found', function(){
				console.log('join code found --> state.go waiting');
				state.whereTo = 'private';
				state.joinCode = joinCode;
				$state.go('waiting');
			});

			on('join code not found', function(data) {
				console.log('code to join private game not found');
				state.joinCodeErrorMessage2 = data.message;
			});

			emit('join private game', {joinCode: joinCode});
		}

		function get(key){
			return state[key];
		}

		function getPlayer() {
			console.log('running getPlayer');
      on('you are', function(resp) {
        console.log('this is user:', resp);
        state.player = resp;
        state.avatar = resp.avatar;
      });
      emit('who am i');
		}

		function setNewAvatar(avatar){
			state.tempAvatar = '';
			state.tempAvatar += avatar;
		}

		function updateAvatar(obj) {
			// obj consists of avatar and email
			console.log('this is temp variable: ', obj);
			state.avatar = obj.avatar;
			emit('update avatar', obj);
		}

		function set(key, value){
			state[key] = value;
		}

	}
