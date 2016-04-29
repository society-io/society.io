angular
  .module('app')
  .config(config);


function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('lobby');

	$stateProvider
	  .state('lobby', {
	  	url: '/lobby',
	  	templateUrl: '../app/layout/homepage/homepage.html',
	  	controller: 'IndexController'
	  })
	  .state('battlefield', {
	  	url: '/battlefield',
	  	templateUrl: '../app/layout/battlefield/battlefield.html',
	  	controller: 'BattlefieldController'
	  });
}