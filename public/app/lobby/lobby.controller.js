
(function () {
'use strict';
 angular
	.module('app')
	.controller('LobbyController', LobbyController);

	LobbyController.$inject = [ 'lobbyFactory', 'socketFactory', 'authFactory'];

	function LobbyController (lobbyFactory, socketFactory, authFactory) {
		
		authFactory.checkAuth();
		
		var vm = this;
		socketFactory.connectSocket();

		vm.queue = lobbyFactory.joinQueue;

		vm.createGame = lobbyFactory.newPrivateGame;
		vm.showCreateGameInput = false;
		vm.showCreateGameController = function () {
			vm.showCreateGameInput = true;
		};
		
		vm.joinGame = lobbyFactory.joinPrivateGame;
		vm.showJoinGameInput = false;
		vm.showJoinGameController = function () {
			vm.showJoinGameInput = true;
		};

		vm.signOut = function() {
			authFactory.signOut();
		};

	}

})();
