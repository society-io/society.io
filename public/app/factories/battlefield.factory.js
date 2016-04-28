angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http']; //injections go inside brackets

function bfFactoryFunction('$http') {
	var ben = true;  

  //flags at top and then factory, then function declarations

	var factory = {
		name: name
	}
	return factory

  //expose factory first; declare functions below

  function name() {
  	console.log("battlefield name factory function!");
  }
}