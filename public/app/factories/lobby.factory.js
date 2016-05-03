angular
  .module('app')
  .factory('lobbyFactory', lobbyFactory);

lobbyFactory.$inject = []; //injections go inside brackets

function lobbyFactory() {


  //flags at top and then factory, then function declarations

	var state = {

	};
  
	return factory;

  //expose factory first; declare functions below

  function name() {
  	console.log("battlefield name factory function!");
  }
}