(function (){
  'use strict';
  angular
    .module('app')
	  .controller('BattlefieldController', BattlefieldController);

  BattlefieldController.$inject = [
    '$scope',
    'battlefieldFactory',
    'battlefieldLogicFactory',
    'battlefieldTimerFactory',
    'socketFactory',
    'soundFactory'
  ];

  function BattlefieldController($scope, battlefieldFactory, battlefieldLogicFactory, battlefieldTimerFactory, socketFactory, soundFactory) {

    // abbreviate
    var vm = this;
    var bf = battlefieldFactory;
    var bfLogic = battlefieldLogicFactory;
    var bfTimer = battlefieldTimerFactory;

    // set up the document ready signal
    if (socketFactory.isConnected()) {
      angular.element(document).ready(function() {
        setTimeout(function() {
          console.log('Emitted: clientReady');
          socketFactory.emit('client ready');
        }, 2000);
      });
    }

    $scope.$on('runAnimations', runAnimations);
    soundFactory.loadSounds();

    // factory getters
    vm.choices = bf.get('choices');
    vm.setChoice = bf.setChoice;
    vm.get = bf.get;
    vm.forfeit = bf.forfeit;
    vm.winsAgainst = bfLogic.winsAgainst;
    vm.losesAgainst = bfLogic.losesAgainst;
    vm.getTime = bfTimer.getTime;

    // View State Elements
    vm.currentHover = '';
    vm.showEmotes = false;
    vm.showSideControls = false;
    vm.player = {
      showOptions: false
    };
    vm.opponent = {
      showOptions: false
    };

    // factory functions
    vm.emoteToggle = function() {
      console.log('running emoteToggle');
      vm.showEmotes = !vm.showEmotes;
    };

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
      console.log('opponentChoice = ', vm.get('opponent'));
      console.log('roundWinner = ', vm.get('roundWinner'));
      console.log('playerID = ', vm.get('player').id);
    };

    function runAnimations() {
      vm.player.showOptions = true;
      setTimeout(function() {
        vm.opponent.showOptions = true;
        vm.showSideControls = true;
      }, 500);
    }

    vm.playClick = function() {
      console.log('BattlefieldController playClick');
      soundFactory.playClick();
    };
    vm.playConfirm = function() {
      console.log('BattlefieldController playConfirm');
      soundFactory.playConfirm();
    };
    vm.playDamage = function() {
      console.log('BattlefieldController playDamage');
      soundFactory.playDamage();
    };
    vm.playDeath = function() {
      console.log('BattlefieldController playDeath');
      soundFactory.playDeath();
    };
  } // end of controller function
})();
