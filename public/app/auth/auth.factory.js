(function (){
  angular
    .module('app')
    .factory('authFactory', authFactory);

    authFactory.$inject = ['$http', '$window', '$state'];

    function authFactory($http, $window, $state) {

      return {
        signup: signup,
        signin: signin
      };

      function signup(userObj) {
        var request = {
          method: 'POST',
          url: '/signup',
          data: userObj
        };

        return $http(request)
          .then(success, error);

        function success(resp){
          console.log('successful signup: ', resp);
          $state.go('auth');
        }

        function error(err){
          return console.error(err);
        }
      }

      function signin(userObj) {
        var request = {
          method: 'POST',
          url: '/signin',
          data: userObj
        };

        return $http(request)
          .then(success, error);

        function success(resp){
          console.log('successful signin: ', resp);
          saveToken(resp.data.token);
          $state.go('lobby');
        }

        function error(err){
          return console.error(err);
        }
      }

      function attachToken(obj) {
        obj.token = $window.localStorage.token;
        return obj;
      }

      function getToken(obj) {
        return $window.localStorage.token;
      }

      function saveToken(token) {
        $window.localStorage.token = token;
      }
    }
})();
