(function (){
	'use strict';
angular
  .module('app')
  .controller('AuthController', AuthController);

AuthController.$inject = [];

function AuthController() {
	/* jshint validthis: true */
	var vm = this;
	this.signup = false;
	this.signin = false;



	vm.signup = function(obj){
		Auth.signup(obj).then(function(resp) {
			console.log(resp);
		})
	}

}
})();
