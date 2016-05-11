(function() {

  angular
    .module('app')
    .controller('AppController', appController);

  appController.$inject = ['$scope', '$state', '$window', 'socketFactory', 'ngAudio'];

  function appController($scope, $state, $window, socketFactory, ngAudio) {
    var emit = socketFactory.emit;
    var on = socketFactory.on;

    var vm = this;
    vm.bodyClasses = 'default';

    function goToLobby() {
      $state.go('lobby');
      $window.location.reload();
    }

    (function musicPlayer() {
      var playlist = ['../audio/NVOY-AllNight.mp3'];
      for(var i=0; i<playlist.length; i++) {
        ngAudio.play(playlist[i]);
      }
    })();

    // this'll be called on every state change in the app
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

      if (toState.name !== 'auth' && toState.name !== 'lobby') {
        if (!socketFactory.isConnected()) {
          goToLobby();
        }
      }

      if (fromState.name === 'battlefield' && toState.name === 'lobby') {
        $window.location.reload();
      }

      if(fromState.name === 'waiting' && toState.name !== 'battlefield') {
        emit('remove from queue');
        goToLobby();
      }

      if(fromState.name === 'battlefield' && toState.name !== 'lobby') {
        goToLobby();
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