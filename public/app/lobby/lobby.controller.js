
(function () {
'use strict';
 angular
	.module('app')
	.controller('LobbyController', LobbyController);

	LobbyController.$inject = ['$scope', 'lobbyFactory', 'statsFactory', 'socketFactory', 'authFactory'];

	function LobbyController($scope, lobbyFactory, socketFactory, authFactory, statsFactory) {
		var vm = this;
		vm.pageTitle = "Lobby";

		authFactory.checkAuth();
		var tokenObj = authFactory.attachToken({});

		socketFactory.connectSocket();

		vm.queue = lobbyFactory.joinQueue;

		vm.createRoom = lobbyFactory.createRoom;
		vm.showCreateGameInput = false;
		vm.showCreateGameController = false;

		vm.joinRoom = lobbyFactory.joinRoom;
		vm.showJoinGameInput = false;
		vm.showJoinGameController = false;

		vm.signOut = function() {
			authFactory.signOut();
		};

		vm.getErrorMessage = function() {
			var message = lobbyFactory.get('joinCodeErrorMessage');
			return lobbyFactory.get('joinCodeErrorMessage');
		};

	}
	})();
