(function(){


angular
  .module('app')
  .controller('WaitingController', WaitingController);

  WaitingController.$inject = ['waitingFactory'];

  function WaitingController(waitingFactory) {

    var vm = this;

    vm.playerOne = function(){
    	return waitingFactory.get('player1Name');
    };

  }

})();