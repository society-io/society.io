(function() {
angular
  .module('app')
  .factory('statsFactory', statsFactory);

  statsFactory.$inject = ['$http', 'lobbyFactory'];

  function statsFactory($http, lobbyFactory) {

    var state = {
      leaderboard: false
    };

    Number.prototype.format = function(n, x) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
      return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };

  	return {
      get: get,
      getBoard: getBoard,
      updatePlayerAvatar: updatePlayerAvatar
    };

    function getBoard() {
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
    }

    function getUsersFromDB() {
      return $http.get('/leaderboard');
    }

    function get(key) {
    	return state[key];
    }

    function updatePlayerAvatar(newAvatar) {
      state.leaderboard.forEach(function(user) {
        if (user.username === lobbyFactory.get('player').username) {
          user.avatar = newAvatar;
          temp = user;
        }
      });
    }

  }

})();
