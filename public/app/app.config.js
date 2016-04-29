angular
  .module('app')
  .config(config);

function config($routeProvider) {
	$routeProvider
	  .when('/battlefield', {
	  	templateUrl: 'battlefield.html',
	  	controller: 'BattlefieldController',
	  	controllerAs: 'bfc'
	  });
}