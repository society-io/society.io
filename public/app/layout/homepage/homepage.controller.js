(function (){
	'use strict';
angular
  .module('app')
  .controller('IndexController', IndexController);

IndexController.$inject = ['indexFactory', '$state'];

function IndexController(indexFactory, $state) {
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