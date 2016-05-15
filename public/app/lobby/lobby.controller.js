
(function () {
'use strict';
 angular
  .module('app')
  .controller('LobbyController', LobbyController);

  LobbyController.$inject = ['$scope', 'lobbyFactory', 'socketFactory', 'authFactory', 'statsFactory', 'soundFactory'];

  function LobbyController($scope, lobbyFactory, socketFactory, authFactory, statsFactory, soundFactory) {
    var socket = socketFactory;

    var vm = this;
    vm.pageTitle = "Lobby";

    console.log('lobby controller');

    soundFactory.loadSounds();
    authFactory.checkAuth();

    $scope.options = {
      playlist: ['../audio/NVOY-AllNight.mp3'],
      loop: true
    };

    vm.get = lobbyFactory.get;
    vm.set = lobbyFactory.set;

    vm.showCreateGameInput = false;
    vm.showCreateGameController = false;

    vm.joinRoom = lobbyFactory.joinRoom;
    vm.showJoinGameInput = false;
    vm.showJoinGameController = false;

    vm.showPreQueueWarning = false;

    vm.showAvatars = false;

    vm.createRoom = function(joinCode) {
      if (joinCode === undefined || joinCode.length < 3) {
        lobbyFactory.set('joinCodeErrorMessage', 'Minimum of 3 characters required.');
        return;
      }

      lobbyFactory.set('tempJoinCode', joinCode);

      socket.emit('create private game', {joinCode: joinCode.toLowerCase()});
    };

    vm.queue = function(message) {
      socket.emit('queue', message);
    };

    vm.signOut = function() {
      authFactory.signOut();
    };

    vm.getErrorMessage = function(val) {
      var message = lobbyFactory.get(val);
      return lobbyFactory.get(val);
    };

    vm.toggleQueueWarning = function() {
      if(vm.showPreQueueWarning) {
        vm.showPreQueueWarning = false;
      } else {
        vm.showPreQueueWarning = true;
      }
    };

    vm.getLeaderboard = function() {
      return statsFactory.get('leaderboard');
    };

    vm.myAvatar = function() {
      return vm.get('avatar');
    };

    vm.getAvatar = function() {
      var player = vm.get('player');
      vm.myAvatar = player.avatar;
    };

    vm.updateAvatar = function(obj) {
      lobbyFactory.set('avatar', obj.avatar);
      socketFactory.emit('update avatar', obj);
    };

    vm.setNewAvatar = function(avatar) {
      lobbyFactory.set('tempAvatar', avatar);
    };

    vm.playClick = function() {
      soundFactory.playClick();
    };

    vm.playConfirm = function() {
      soundFactory.playConfirm();
    };

  }
})();
