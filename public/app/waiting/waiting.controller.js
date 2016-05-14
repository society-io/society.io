(function(){
'use strict';
angular
  .module('app')
  .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['$state', 'waitingFactory', 'lobbyFactory', 'soundFactory'];

  function WaitingController($state, waitingFactory, lobbyFactory, soundFactory) {

    var vm = this;

    soundFactory.loadSounds();

    var lf = lobbyFactory;
    vm.lfGet = lf.get;
    vm.get = waitingFactory.get;

    vm.cancelRoom = waitingFactory.cancelRoom;
    vm.showCancelGameInput = false;
    vm.showCancelGameController = function() {
      vm.showCancelGameInput = true;
    };

    vm.showCancelGameForm = false;

    vm.removeFromQueue = function(){
      waitingFactory.removeFromQueue();
    };
  }

})();
