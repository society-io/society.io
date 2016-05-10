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
			controllerAs: 'Auth',
			data: {
				bodyClasses: 'auth'
			}
		})
	  .state('lobby', {
	  	url: '/lobby',
	  	templateUrl: '../app/lobby/lobby.html',
	  	controller: 'LobbyController',
	  	controllerAs: 'Lobby',
	  	data: {
	  		bodyClasses : 'lobby'
	  	}
	  })
	  .state('loading', {
	  	url: '/loading',
	  	templateUrl: '../app/loading/loading.html'
	  })
		.state('waiting', {
			url: '/waiting',
			templateUrl: '../app/waiting/waiting.html',
			controller: 'WaitingController',
			controllerAs: 'Waiting',
			data: {
				bodyClasses: 'waiting'
			}
		})
	  .state('battlefield', {
	  	url: '/battlefield',
	  	templateUrl: '../app/battlefield/battlefield.html',
	  	controller: 'BattlefieldController',
	  	controllerAs: 'Bf',
	  	data: {
	  		bodyClasses: 'battlefield'
	  	}
	  });
}