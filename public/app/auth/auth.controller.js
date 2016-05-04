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
	vm.errorMessage = function(){
		return authFactory.get('errorMessage');
	};
	console.log('this is error mesg: ', vm.errorMessage);


	vm.signup = authFactory.signup;
	vm.signin = authFactory.signin;

}
})();
