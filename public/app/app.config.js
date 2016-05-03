angular
  .module('app')
  .config(config);


function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('login');
	$stateProvider
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
	  })
		.state('login', {
			url: '/login',
			templateUrl: '../app/layout/login/login.html',
			controller: 'LoginController',
			controllerAs: 'Login'
	});
}