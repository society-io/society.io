(function(){


angular
  .module('app')
  .controller('LoadingController', LoadingController);

  LoadingController.$inject = ['loadingFactory'];

  function LoadingController(loadingFactory) {
  	
    var vm = this;

    vm.playerOne = function(){
    	return loadingFactory.get('player1Name');
    };

  }

})();