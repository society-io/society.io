(function (){
  'use strict';
  angular
    .module('app')
	  .controller('BattlefieldController', BattlefieldController);  

  BattlefieldController.$inject = ['battlefieldFactory'];

  function BattlefieldController(battlefieldFactory) {
		/* jshint validthis: true */
		var vm = this;
	  vm.name = {};
	  //declare bindable members here ***
		//ex:  vm.refresh = refresh



		//declare functions here ***
		//no function declarations
	  //ex: function refresh() {};
  }
})();