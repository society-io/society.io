(function() {
angular
  .module('app')
  .factory('statsFactory', statsFactory);

  statsFactory.$inject = ['$http'];

  function statsFactory($http) {

    var state = {leaderboard: null};
    
    getUsersFromDB().then(function(users) {
      	state[leaderboard] = users;
    });

  	return {get: get};

    function getUsersFromDB($http) {
      return $http.get('/leaderboard');
    }

    function get(key) {
    	return state[key];
    }

  }

})();