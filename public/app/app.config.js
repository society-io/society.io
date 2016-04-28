angular
  .module('app')
  .config(config);


function config($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('lobby');
	  .state('/lobby', {
	  	url: '/lobby',
	  	templateUrl: './layout/homepage/index.html',
	  	controller: 
	  })
}