
(function () {
'use strict';
 angular
	.module('app')
	.controller('LobbyController', LobbyController);

	LobbyController.$inject = ['$scope', 'lobbyFactory', 'socketFactory', 'authFactory'];

	function LobbyController($scope, lobbyFactory, socketFactory, authFactory) {
		var vm = this;
		vm.pageTitle = "Lobby";

		authFactory.checkAuth();
		var tokenObj = authFactory.attachToken({});

		socketFactory.connectSocket();

		vm.queue = lobbyFactory.joinQueue;

		vm.createRoom = lobbyFactory.createRoom;
		vm.showCreateGameInput = false;
		vm.showCreateGameController = function() {
			vm.showCreateGameInput = true;
		};

		vm.joinRoom = lobbyFactory.joinRoom;
		vm.showJoinGameInput = false;
		vm.showJoinGameController = function() {
			vm.showJoinGameInput = true;
		};

		vm.signOut = function() {
			authFactory.signOut();
		};

	}
	})();
