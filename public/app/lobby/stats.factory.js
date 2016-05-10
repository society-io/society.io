(function() {
angular
  .module('app')
  .factory('statsFactory', statsFactory);

  statsFactory.$inject = ['$http'];

  function statsFactory($http) {
  	
    var state = {};

  	return {getUsers: getUsers};

    function getUsers ($http) {
      return $http.get('/leaderboard');
    }
  }

})();