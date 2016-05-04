(function (){
  angular
    .module('app')
    .factory('authFactory', authFactory);

    authFactory.$inject = ['$http', '$window', '$state', '$location'];

    function authFactory($http, $window, $state, $location) {

      return {
        signup: signup,
        signin: signin,
        signout: signout,
        checkAuth: checkAuth
      };

      function signup(userObj) {
        var request = {
          method: 'POST',
          url: '/signup',
          data: userObj
        };

        return $http(request)
          .then(success, error);

        function success(resp) {
          if (resp.data.token) {
            $state.go('lobby');
            saveToken(resp.data.token);
          }
          if (resp.data.nameExists) {
            console.log('name exists!');
          }
        }

        function error(err) {
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

        function success(resp) {
          console.log('successful signin: ', resp);
          if (resp.data.auth){
            $state.go('lobby');
            saveToken(resp.data.token);
          }
        }
        function error(err) {
          return console.error(err);
        }
      }

      function signout() {
        console.log('authFactory: Signing Out User...');
        $window.localStorage.removeItem('token');
        delete $window.localStorage.token;
        $location.url('/');
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

      function isAuthed(token) {
        return !!$window.localStorage.token;
      }

      function checkAuth() {
        if(!isAuthed()) {
          $state.go('auth');
        }
      }
    }
})();
