(function(){


angular
  .module('app')
  .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['waitingFactory'];

  function WaitingController(waitingFactory) {

    var vm = this;

    vm.playerOneName = function() {
    	return waitingFactory.get('player1Name');
    };
    vm.playerOneMMR = function() {
    	return waitingFactory.get('player1MMR');
    };
    vm.playerTwoName = function() {
    	return waitingFactory.get('player1Name');
    };
    vm.playerTwoMMR = function() {
    	return waitingFactory.get('player2MMR');
    };
  }

})();