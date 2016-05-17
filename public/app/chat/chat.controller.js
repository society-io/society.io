(function () {
  'use strict';
  angular
    .module('app')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', 'lobbyFactory', 'socketFactory', 'chatFactory'];

  function ChatController($scope, lobbyFactory, socketFactory, chatFactory) {
    var vm = this;

    vm.messages = null;

    vm.get = chatFactory.get;

    vm.messages = chatFactory.get('messages');

    vm.sendMessage = function(message)  {
      socketFactory.emit('new message', {message: message});
      vm.message = '';
    };

  }
})();