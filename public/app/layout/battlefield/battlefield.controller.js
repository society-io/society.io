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
		vm.choicesReady = false;
		vm.choices = battlefieldFactory.getter('choices');
		vm.getResults = function(){
			return battlefieldFactory.getter('results');
		};
		vm.playerId = battlefieldFactory.getter('playerId');
		vm.oppenentId = function(){
			console.log("inside controller",battlefieldFactory.getter('oppenentId'));
			return battlefieldFactory.getter('oppenentId');
		};
		console.log('this is oppenentId', vm.oppenentId);
	  vm.setChoice = battlefieldFactory.setChoice;
  }
})();