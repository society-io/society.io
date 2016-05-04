
(function () {
'use strict';
 angular
  .module('app')
  .controller('LobbyController', LobbyController);

  LobbyController.$inject = ['preGameFactory', 'socketFactory', 'authFactory', '$state'];

  function LobbyController (preGameFactory, socketFactory, authFactory, $state) {

    authFactory.checkAuth();

    var vm = this;
    socketFactory.connectSocket();

    vm.signOut = authFactory.signout;

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