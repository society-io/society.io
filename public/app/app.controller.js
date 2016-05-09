(function() {

  angular
    .module('app')
    .controller('AppController', appController);

  appController.$inject = ['$scope', '$state', 'socketFactory'];

  function appController($scope, $state, socketFactory) {
    var vm = this;
    vm.bodyClasses = 'default';

    // this'll be called on every state change in the app
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

      console.log('is going to auth?', toState.name === 'auth');
      console.log('is going to lobby?', toState.name === 'lobby');

      if (toState.name !== 'auth' && toState.name !== 'lobby') {
        if (!socketFactory.isConnected()) {
          console.log('connection does not exist.');
          console.log('socketFactory.isConnected = ', socketFactory.isConnected());
          console.log('going to lobby');
          $state.go('lobby');
        }
      }

      // // if the toState is not auth or lobby
      // if (toState.name !== 'auth' || toState.name !== 'lobby') {

      //   // check if a socket connection exists
      //   if (!socketFactory.isConnected()) {
      //     $state.go('lobby');
      //   }
      // }

      if (angular.isDefined(toState.data)) {
        if (angular.isDefined(toState.data.bodyClasses)) {
            vm.bodyClasses = toState.data.bodyClasses;
            return;
        }
      }

      vm.bodyClasses = 'default';
    });
  }

})();
