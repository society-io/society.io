angular
  .module('app')
  .config(config);


function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('lobby')
	  .state('/lobby', {
	  	url: '/lobby',
	  	templateUrl: './layout/homepage/index.html',
	  	controller: 'IndexController'
	  })
	  .state('/battlefield', {
	  	url: '/battlefield',
	  	templateUrl: './layout/battlefield/battlefield.html',
	  	controller: 'BattlefieldController'
	  });
}