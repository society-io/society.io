(function (){
  'use strict';
  angular
    .module('app')
	  .controller('BattlefieldController', BattlefieldController);  

  BattlefieldController.$inject = ['battlefieldFactory'];

  function BattlefieldController(battlefieldFactory) {

    // abbreviate
    var vm = this;
    var bf = battlefieldFactory;

		vm.choices = bf.get('choices');
	  vm.setChoice = bf.setChoice;

    vm.getChoice = function(person) {
      return bf.get(person + 'Choice');
    };

    vm.getHealth = function(person) {
      return bf.get(person + 'Health');
    };

    vm.getRoundWinner = function() {
      return bf.get('roundWinner');
    };

    vm.getSubmitted = function() {
      return bf.get('submitted');
    };
  }
})();
