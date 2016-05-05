(function (){
  angular
    .module('app')
    .factory('authFactory', authFactory);

    authFactory.$inject = ['$http', '$window', '$state', '$location'];

    function authFactory($http, $window, $state, $location) {

      var state = {
        signupErrorMessage: '',
        signinErrorMessage: ''
      };

      return {
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        checkAuth: checkAuth,
        attachToken: attachToken,
        get: get
      };

      function signUp(userObj) {
        var request = {
          method: 'POST',
          url: '/signUp',
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
            state.signupErrorMessage = "";
            state.signupErrorMessage += resp.data.message;
          }
        }

        function error(err) {
          return console.error(err);
        }
      }

      function signIn(userObj) {
        var request = {
          method: 'POST',
          url: '/signIn',
          data: userObj
        };

        return $http(request)
          .then(success, error);

        function success(resp){
          console.log('this is resp: ', resp);
          if (resp.data.auth){
            $state.go('lobby');
            saveToken(resp.data.token);
          }
          if (!resp.data.auth){
            state.signinErrorMessage = "";
            state.signinErrorMessage += resp.data.message;
          }
        }
        function error(err) {
          return console.error(err);
        }
      }

      function get(name) {
        return state[name];
      }

      function signOut() {
        $window.localStorage.removeItem('token');
        delete $window.localStorage.token;
        $location.url('/');
      }
      
      function attachToken(obj) {
        obj.token = $window.localStorage.token;
        return obj;
      }

      function getToken() {
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
