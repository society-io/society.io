(function () {
  'use strict';
  angular
    .module('app')
    .controller('ChatController', ChatController);
    ChatController.$inject = ['$scope', 'lobbyFactory', 'socketFactory', 'authFactory', 'statsFactory'];

  function ChatController($scope, lobbyFactory, socketFactory, authFactory, statsFactory) {
    var vm = this;
    // authFactory.checkAuth();
    // var tokenObj = authFactory.attachToken({});
    // vm.get = lobbyFactory.get;
    $scope.message = {};
    socketFactory.on('user joined', function(data) {
      console.log(data);
    });

    socketFactory.on('updated user list', function(data) {
      console.log(data);
    });

   socketFactory.on('message', function(data){
      $scope.message= data;
      console.log(data);
    });

  socketFactory.on('user left', function(data){
    console.log(data);
  });

    vm.sendMessage = function()  {
      socketFactory.emit('message', {message: 'hello'});
    };

  }
})();