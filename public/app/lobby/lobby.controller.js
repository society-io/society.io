(function () {
'use strict';
 angular
  .module('app')
  .controller('LobbyController', LobbyController);

  LobbyController.$inject = ['$scope', 'lobbyFactory', 'socketFactory', 'authFactory', 'statsFactory', 'soundFactory', 'chatFactory'];

  function LobbyController($scope, lobbyFactory, socketFactory, authFactory, statsFactory, soundFactory, chatFactory) {

    var socket = socketFactory;
    var vm = this;

    soundFactory.loadSounds();
    authFactory.checkAuth();

    vm.get = lobbyFactory.get;
    vm.set = lobbyFactory.set;

    vm.showCreateGameInput = false;
    vm.showCreateGameController = false;
    vm.showJoinGameInput = false;
    vm.showJoinGameController = false;
    vm.showPreQueueWarning = false;
    vm.showAvatars = false;
    vm.showTutorial = false;
    vm.joinQueueTutorial = false;
    vm.gameplayTutorial = false;
    vm.createPrivateGameTutorial = false;
    vm.joinPrivateGameTutorial = false;

    vm.messages = null;
    vm.getChats = chatFactory.get;
    vm.messages = chatFactory.get('messages');

    vm.joinRoom = function(joinCode) {
      if (joinCode === undefined || joinCode.length < 3) {
        lobbyFactory.set('joinCodeErrorMessage2', 'Minimum 3 characters required!');
        return;
      }
      lobbyFactory.set('waiting', true);
      lobbyFactory.set('tempJoinCode', joinCode);
      socket.emit('join private game', {joinCode: joinCode});
    };

    vm.createRoom = function(joinCode) {
      if (joinCode === undefined || joinCode.length < 3) {
        lobbyFactory.set('joinCodeErrorMessage', 'Minimum of 3 characters required.');
        return;
      }
      lobbyFactory.set('waiting', true);
      lobbyFactory.set('tempJoinCode', joinCode);
      socket.emit('create private game', {joinCode: joinCode.toLowerCase()});
    };

    vm.queue = function(message) {
      lobbyFactory.set('waiting', true);
      socket.emit('queue', message);
    };
	  
	  vm.chat = function(){
		  socket.emit('chat');
	  };


    vm.signOut = function() {
      authFactory.signOut();
    };

    vm.toggleQueueWarning = function() {
      if(vm.showPreQueueWarning) {
        vm.showPreQueueWarning = false;
      } else {
        vm.showPreQueueWarning = true;
      }
    };

    vm.toggleTutorial = function() {
      if(vm.showTutorial) {
        vm.showTutorial = false;
      } else {
        vm.showTutorial = true;
      }
    };

    vm.getLeaderboard = function() {
      return statsFactory.get('leaderboard');
    };

    vm.updateAvatar = function(obj) {
      if (obj.avatar === ""){
        return;
      }
      lobbyFactory.set('avatar', obj.avatar);
      socketFactory.emit('update avatar', obj);
      statsFactory.updatePlayerAvatar(obj.avatar);
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

    vm.playChat = function() {
      soundFactory.playChat();
    };

    vm.sendMessage = function(message)  {
      socketFactory.emit('new message', {message: message});
      vm.message = '';
    };
  }
})();
