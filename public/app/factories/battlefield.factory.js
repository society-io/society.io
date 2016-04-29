angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http', 'socketFactory']; //injections go inside brackets

function bfFactoryFunction($http, socketFactory) {

  //flags at top and then factory, then function declarations

  var emit = socketFactory.emit;
  var on = socketFactory.on;
  on('gameReady', function(resp){
    console.log('Game ready: ', resp);
  });

	var factory = {
	};
	return factory;

  //expose factory first; declare functions below

}