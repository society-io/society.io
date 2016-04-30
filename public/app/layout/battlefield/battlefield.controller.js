(function (){
  'use strict';
  angular
    .module('app')
	  .controller('BattlefieldController', BattlefieldController);  

  BattlefieldController.$inject = ['battlefieldFactory'];

  function BattlefieldController(battlefieldFactory) {
		/* jshint validthis: true */
		var vm = this;
		vm.currentChoice = false;
		vm.choices = battlefieldFactory.getter('choices');
		console.log('this is choices: ', vm.choices);
	  vm.setChoice = battlefieldFactory.setChoice;
  }
})();