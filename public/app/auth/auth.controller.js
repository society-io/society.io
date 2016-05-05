(function (){
	'use strict';
angular
  .module('app')
  .controller('AuthController', AuthController);

AuthController.$inject = ['authFactory', '$scope'];

function AuthController(authFactory, $scope) {
	/* jshint validthis: true */
	var vm = this;
	vm.signUpForm = false;
	vm.signInForm = false;
	vm.errorMessage = function(){
		return authFactory.get('errorMessage');
	};

	vm.signUp = authFactory.signUp;
	vm.signIn = authFactory.signIn;

}
})();
