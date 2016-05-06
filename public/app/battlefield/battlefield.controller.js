(function (){
  'use strict';
  angular
    .module('app')
	  .controller('BattlefieldController', BattlefieldController);

  BattlefieldController.$inject = [
    'battlefieldFactory',
    'battlefieldLogicFactory',
    'battlefieldTimerFactory',
    'socketFactory',
    '$scope'
  ];

  function BattlefieldController(battlefieldFactory, battlefieldLogicFactory, battlefieldTimerFactory, socketFactory, $scope) {

    // abbreviate
    var vm = this;
    var bf = battlefieldFactory;
    var bfLogic = battlefieldLogicFactory;
    var bfTimer = battlefieldTimerFactory;

    // set up the document ready signal
    angular.element(document).ready(function() {
      setTimeout(function() {
        console.log('emitting client ready!');
        socketFactory.emit('client ready');
      }, 2000);
    });

    // View State Elements
    vm.currentHover = '';
    vm.choices = bf.get('choices');
    vm.setChoice = bf.setChoice;
    vm.get = bf.get;
    vm.forfeit = bf.forfeit;
    vm.winsAgainst = bfLogic.winsAgainst;
    vm.losesAgainst = bfLogic.losesAgainst;
    vm.getTime = bfTimer.getTime;

    // factory functions
    vm.getChoice = function(person) {
      return bf.get(person + 'Choice');
    };

    vm.getHealth = function(person) {
      return bf.get(person + 'Health');
    };

    vm.hover = function(choice) {
      console.log('hi');
      vm.currentHover = choice;
    };

    vm.unhover = function() {
      vm.currentHover = '';
    };

    vm.debugger = function() {
      console.log('opponent choice = ', vm.get('opponent'));
      console.log('roundWinner = ', vm.get('roundWinner'));
      console.log('player id = ', vm.get('player').id);
    };
  }
})();
