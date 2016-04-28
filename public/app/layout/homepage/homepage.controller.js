(function (){
angular
  .module('app')
  .controller('IndexController', IndexController);

IndexController.$inject = ['indexFactory', '$state'];

  function IndexController(indexFactory, $state) {
		/* jshint validthis: true */
		var vm = this;
	  vm.goToBf = goToBf;
	  //declare bindable members here ***
		//ex:  vm.refresh = refresh



		//declare functions here ***
		//no function declarations
	  //ex: function refresh() {};
	  function goToBf() {
	  	$state.go('battlefield');
	  }
  };
})();