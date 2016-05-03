
(function () {
'use strict';
 angular
	.module('app')
	.controller('LobbyController', LobbyController);

	LobbyController.$inject = [ 'preGameFactory', 'socketFactory'];

	function LobbyController (preGameFactory, socketFactory) {
		
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