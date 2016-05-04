
(function () {
'use strict';
 angular
	.module('app', ['firebase'])
	.controller('LobbyController', LobbyController);

	LobbyController.$inject = [ 'preGameFactory', 'socketFactory', '$firebaseAuth'];

	function LobbyController (preGameFactory, socketFactory, $firebaseAuth) {
		var ref = new Firebase("https://blistering-torch-6348.firebaseio.com/");
		$scope.authObj = $firebaseAuth(ref);

		var vm = this;
		socketFactory.connectSocket();

		vm.queue = preGameFactory.joinQueue;

		vm.createGame = preGameFactory.newPrivateGame;
		vm.showCreateGameInput = false;
		vm.showCreateGameController = function () {
			vm.showCreateGameInput = true;
		};

		vm.joinGame = preGameFactory.joinPrivateGame;
		vm.showJoinGameInput = false;
		vm.showJoinGameController = function () {
			vm.showJoinGameInput = true;
		};

	}

})();