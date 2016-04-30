angular
  .module('app')
  .config(config);


function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('lobby');

	$stateProvider
	  .state('lobby', {
	  	url: '/lobby',
	  	templateUrl: '../app/layout/homepage/homepage.html',
	  	controller: 'IndexController',
	  	controllerAs: 'Lobby'
	  })
	  .state('battlefield', {
	  	url: '/battlefield',
	  	templateUrl: '../app/layout/battlefield/battlefield.html',
	  	controller: 'BattlefieldController',
	  	controllerAs: 'Battlefield'
	  });
}