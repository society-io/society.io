(function (){
  angular
    .module('app')
    .factory('authFactory', authFactory);
    
    authFactory.$inject = ['$http', '$window', '$state'];
    
    function authFactory($http, $window, $state) {

      return {
        signup: signup,
        signin: signin,
        logout: logout
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
          if (resp.data.auth){
            $state.go('lobby');
          }
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
          if (resp.data.auth){
            $state.go('lobby');
            saveToken(resp.data.token);
          }
        }
        function error(err){
          return console.error(err);
        }
      }

      function logout() {
        $window.localStorage.removeItem('token');
        delete $window.localStorage.token;
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
