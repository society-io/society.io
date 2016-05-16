(function(){
'use strict';
angular
  .module('app')
  .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['$state', 'socketFactory', 'waitingFactory', 'lobbyFactory', 'soundFactory'];

  function WaitingController($state, socketFactory, waitingFactory, lobbyFactory, soundFactory) {

    var vm = this;
    var socket = socketFactory;

    soundFactory.loadSounds();

    var lf = lobbyFactory;
    vm.lfGet = lf.get;
    vm.get = waitingFactory.get;

    vm.showCancelGameForm = false;

    vm.cancelRoom = function(joinCode) {
      socket.emit('cancel private game', {joinCode: joinCode});
      $state.go('lobby');
    };

  }

})();
