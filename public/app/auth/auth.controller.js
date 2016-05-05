(function (){
	'use strict';
angular
  .module('app')
  .controller('AuthController', AuthController);

AuthController.$inject = ['authFactory', '$scope'];

function AuthController(authFactory, $scope) {
	/* jshint validthis: true */
	var vm = this;

	vm.signupForm = false;
	vm.signinForm = false;
	vm.signupErrorMessage = function(){
		return authFactory.get('signupErrorMessage');
	};
	vm.signinErrorMessage = function(){
		return authFactory.get('signinErrorMessage');
	};

	vm.signup = function(obj){
		authFactory.signup(obj);
		vm.usernameUp = '';
		vm.emailUp = '';
		vm.passwordUp = '';
	};

	vm.signin = function(obj){
		authFactory.signin(obj);
		vm.usernameIn = '';
		vm.passwordIn = '';
	};

}
})();
