(function (){
	'use strict';
angular
  .module('app')
  .controller('LobbyController', LobbyController);

LobbyController.$inject = ['lobbyFactory', '$state'];

function LobbyController(indexFactory, $state) {
	/* jshint validthis: true */
	var vm = this; 
	vm.goToBf = goToBf;


	//declare functions here ***
	//no function declarations
	//ex: function refresh() {};
	function goToBf() {
		console.log('button clicked');
		$state.go('battlefield');
	}
}
})();
