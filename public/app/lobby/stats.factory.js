(function() {
angular
  .module('app')
  .factory('statsFactory', statsFactory);

  statsFactory.$inject = ['$http'];

  function statsFactory($http) {

    var state = {leaderboard: false};
    
    getUsersFromDB().then(function(users) {      
      var storage = [];
      for(var i = 0; i < users.data.length; i++){
        storage.push(users.data[i]);
      }
      var sorted = storage.sort(function(a, b) {
        return b.mmr - a.mmr;
      });
      state.leaderboard = sorted;
    });

  	return {get: get};

    function getUsersFromDB() {
      return $http.get('/leaderboard');
    }

    function get(key) {
    	return state[key];
    }

  }

})();
