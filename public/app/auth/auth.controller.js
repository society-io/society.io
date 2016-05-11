(function (){

angular
  .module('app')
  .controller('AuthController', AuthController);

AuthController.$inject = ['authFactory', '$scope'];

function AuthController(authFactory, $scope) {
	/* jshint validthis: true */
	var vm = this;

	vm.signUpForm = false;
	vm.signInForm = true;
	vm.signUpErrorMessage = function(){
		return authFactory.get('signupErrorMessage');
	};
	vm.signInErrorMessage = function(){
		return authFactory.get('signinErrorMessage');
	};
	vm.set = function(key, value){
		authFactory.set(key, value);
	};


	vm.signUp = function(obj){
		console.log('this is sign up obj: ', obj);
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

	vm.avatarSelected = false;
	vm.avatarsMuted = false;
	vm.get = authFactory.get;

	vm.selectAvatar = function(avatar){
		authFactory.selectAvatar(avatar);
	};

}
})();