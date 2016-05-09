(function(){
'use strict';
angular
  .module('app')
  .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['waitingFactory', 'socketFactory'];

  function WaitingController(waitingFactory, socketFactory) {

    var vm = this;

    vm.cancelRoom = waitingFactory.cancelRoom;
    vm.showCancelGameInput = false;
    vm.showCancelGameController = function() {
      vm.showCancelGameInput = true;
    };

    vm.showCancelGameForm = false;

    vm.removeFromQueue = function(){
      console.log('in controller: remove from q');
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