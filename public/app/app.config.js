angular
  .module('app')
  .config(config);


function config($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('auth');

	$stateProvider
		.state('auth', {
			url: '/auth',
			templateUrl: '../app/layout/auth/auth.html',
			controller: 'AuthController',
			controllerAs: 'Auth'
		})
		.state('loading', {
			url: '/loading',
			templateUrl: '../app/layout/loading/loading.html',
			controller: 'LoadingController',
			controllerAs: 'Loading'
		})
	  .state('lobby', {
	  	url: '/lobby',
	  	templateUrl: '../app/layout/lobby/lobby.html',
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