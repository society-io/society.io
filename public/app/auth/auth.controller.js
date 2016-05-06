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
	vm.signUpErrorMessage = function(){
		return authFactory.get('signupErrorMessage');
	};
	vm.signInErrorMessage = function(){
		return authFactory.get('signinErrorMessage');
	};

	vm.signUp = function(obj){
		authFactory.signUp(obj);
		vm.usernameUp = '';
		vm.emailUp = '';
		vm.passwordUp = '';
	};

	vm.signIn = function(obj){
		authFactory.signIn(obj);
		vm.usernameIn = '';
		vm.passwordIn = '';
	};

}
})();
