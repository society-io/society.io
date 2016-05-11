(function(){
'use strict';
angular
  .module('app')
  .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['waitingFactory', 'lobbyFactory', 'socketFactory', '$state'];

  function WaitingController(waitingFactory, lobbyFactory, socketFactory, $state) {

    var vm = this;
    var lf = lobbyFactory;
    vm.lfGet = lf.get;

    vm.getJoinCode = lf.getJoinCode;

    vm.cancelRoom = waitingFactory.cancelRoom;
    vm.showCancelGameInput = false;
    vm.showCancelGameController = function() {
      vm.showCancelGameInput = true;
    };

    vm.showCancelGameForm = false;

    vm.removeFromQueue = function(){
      waitingFactory.removeFromQueue();
    };

    vm.playerOneName = function() {
    	return waitingFactory.get('player1Name');
    };
    vm.playerOneMMR = function() {
    	return waitingFactory.get('player1MMR');
    };
    vm.playerTwoName = function() {
    	return waitingFactory.get('player2Name');
    };
    vm.playerTwoMMR = function() {
    	return waitingFactory.get('player2MMR');
    };
  }

})();