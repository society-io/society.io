angular
.module('app')
.factory('authFactory', authFactory);
authFactory.$inject = ['$http', '$location', '$window']


function authFactory($http, $location, $window) {
	
	function login (user) {
		return $http({
			method: 'POST',
			url: '/login',
			data: user
		})
		.then(function (resp) {
			console.log(resp);
			return resp;
		});
	};

	function register(user) {
		return $http({
			method: 'POST',
			url: '/register',
			data: user
		})
		.then(function (resp) {
			console.log('resp.data in signup', resp);
			return resp;
		});
	};

	var isAuth = function () {
		return !!$window.localStorage.getItem('token');
	};

	return {
		signin: signin,
		signup: signup,
		isAuth: isAuth
	}
}
