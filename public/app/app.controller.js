(function() {

  angular
    .module('app')
    .controller('AppController', appController);

  appController.$inject = ['$scope'];

  function appController($scope) {
    var vm = this;
    vm.bodyClasses = 'default';

    // this'll be called on every state change in the app
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if (angular.isDefined(toState.data.bodyClasses)) {
            vm.bodyClasses = toState.data.bodyClasses;
            return;
        }

        vm.bodyClasses = 'default';
    });
  }

})();
