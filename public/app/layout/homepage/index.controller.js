angular
  .module('app')
  .controller('IndexController', IndexController);

IndexController.$inject = ['indexFactory'];

  function IndexController(indexFactory) {
		/* jshint validthis: true */
		var vm = this;
	  vm.name = {};
	  //declare bindable members here ***
		//ex:  vm.refresh = refresh



		//declare functions here ***
		//no function declarations
	  //ex: function refresh() {};
  };
})();