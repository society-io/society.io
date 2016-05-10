(function() {

  angular
    .module('app')
    .controller('AppController', appController);

  appController.$inject = ['$scope', '$state', 'socketFactory'];

  function appController($scope, $state, socketFactory) {
    var emit = socketFactory.emit;
    var on = socketFactory.on;

    var vm = this;
    vm.bodyClasses = 'default';

    // this'll be called on every state change in the app
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

      if (toState.name !== 'auth' && toState.name !== 'lobby') {
        if (!socketFactory.isConnected()) {
          $state.go('lobby');
        }
      }

      if(fromState.name === 'waiting' && toState.name !== 'battlefield') {
        emit('remove from queue');
        $state.go('lobby');
      }

      if(fromState.name === 'battlefield' && toState.name !== 'lobby') {
        $state.go('lobby');
      }

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