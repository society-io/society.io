angular
  .module('app')
  .config(config);


function config($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/auth');

	$stateProvider
		.state('auth', {
			url: '/auth',
			templateUrl: '../app/auth/auth.html',
			controller: 'AuthController',
			controllerAs: 'Auth'
		})
		.state('waiting', {
			url: '/waiting',
			templateUrl: '../app/waiting/waiting.html',
			controller: 'WaitingController',
			controllerAs: 'Waiting'
		})
	  .state('lobby', {
	  	url: '/lobby',
	  	templateUrl: '../app/lobby/lobby.html',
	  	controller: 'LobbyController',
	  	controllerAs: 'Lobby'
	  })
	  .state('battlefield', {
	  	url: '/battlefield',
	  	templateUrl: '../app/battlefield/battlefield.html',
	  	controller: 'BattlefieldController',
	  	controllerAs: 'Bf'
	  });
}
