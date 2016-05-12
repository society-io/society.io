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
			get: get,
			getPlayer: getPlayer,
			getJoinCode: getJoinCode,
			set: set,
			setNewAvatar: setNewAvatar,
			updateAvatar: updateAvatar
		};

		function joinQueue(message) {
			on('player already in queue', function(data){
				$state.go('lobby');
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

			on('join code exists', function(data){
				console.log('joinCode exists listener',data.message);
				state.joinCodeErrorMessage = data.message;
			});

			on('private game created', function(data){
				state.whereTo = 'private';
			  $state.go('waiting');
			});

			emit('create private game', {joinCode: joinCode.toLowerCase()});
			console.log('Emitted: create privateGame');
		}

		function joinRoom(joinCode) {

			console.log("joincode kan", joinCode);

			if (joinCode === undefined || joinCode.length < 3) {
				state.joinCodeErrorMessage2 = 'Minimum 3 characters required!';
				return;
			}
			on('private game exists', function(){
				console.log('privateGame exists');
				state.whereTo = 'private';
				$state.go('waiting');
			});
			on('private game doesnt exist', function(data) {
				console.log('privateGame doesnt exist listener',data.message);
				state.joinCodeErrorMessage2 = data.message;
			});
			emit('attempt to join private game', {joinCode: joinCode.toLowerCase()});
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

		function getJoinCode() {
		  on('joinCode is', function(data){
		    state.joinCode = data.yourJoinCode;
		  });
		  emit('get joinCode');
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

		function listenFor(socket) {
			socket.on('joinCode is', function(socket) {
				return data;
			});
		}

		function set(key, value){
			state[key] = value;
		}

	}
