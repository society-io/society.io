(function (){
	'use strict';
angular
  .module('app')
  .controller('AuthController', AuthController);

AuthController.$inject = ['authFactory'];

function AuthController(authFactory) {
	/* jshint validthis: true */
	var vm = this;
	vm.signupForm = false;
	vm.signinForm = false;



	vm.signup = authFactory.signup;

}
})();
