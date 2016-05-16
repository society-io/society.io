(function () {
'use strict';
 angular
  .module('app')
  .controller('ChatController', ChatController);

  ChatController.$inject =['$state', '$scope'];
   // ['$scope', 'lobbyFactory', 'socketFactory']

	 function ChatController($state, $scope) {
		 // ($scope, lobbyFactory, socketFactory)

	  var vm = this;
	 vm.message= {};

	 vm.print = function() {
	   console.log('hi');
	};
};
})();