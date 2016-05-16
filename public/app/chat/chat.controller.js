// (function () {
// 'use strict';
// angular
// 	.module('app')
// 	.controller('ChatController', ChatController);
//
// 	ChatController.$inject = ['$scope', 'socketFactory', 'lobbyFactory'];
//
// 	function ChatController($scope, socketFactory, lobbyFactory) {
// 		var vm = $scope;
// 		vm.user = function () {lobbyFactory.get('player'); }
// 		vm.renderMessages = [];
// 		vm.renderUserList = [];
//
//
//
// 		vm.sendMessage = function () {
// 			socketFactory.emit('send:message', {message: vm.message});
// 			vm.renderMessages.push({user: vm.user, text: vm.message})
// 			vm.message = '';
// 	};
//
//   $scope.users =  undefined;
//
// /* LISTEN */
//   socket.on('loadChats', function (data) {
//     var serverUserList =  data.userList;
//     var messageHistory = data.messageHistory;
//
//    serverUserList.forEach(function(user) {
// 			vm.renderUserList.push(user);
// 		});
//
//
//     $scope.users = data.users;
//   });
//
//   socket.on('send:message', function (message) {
//     $scope.messages.push({
//       user: message.user,
//       text: message.text,
//       });
//   });
//
//   socket.on('user:join', function (data) {
//     $scope.messages.push({user: 'chatroom', text: 'User ' + data.name + ' has joined.'});
//     $scope.users.push(data.name);
//   });
//
//   // add a message to the conversation when a user disconnects or leaves the room
//   socket.on('user:left', function (data) {
//      $scope.messages.push({user: 'chatroom', text: 'User ' + data.name + ' has left.'});
//      $scope.users.remove(data.name);
//   })
//
//
//
//
//
// 	}
// }
// })();



(function () {
  'use strict';
  angular
    .module('app')
    .controller('ChatController', ChatController);
    ChatController.$inject = ['$scope', 'lobbyFactory', 'socketFactory', 'authFactory', 'statsFactory'];

  function ChatController($scope, lobbyFactory, socketFactory, authFactory, statsFactory) {
    var vm = this;
    authFactory.checkAuth();
    var tokenObj = authFactory.attachToken({});
    vm.chatUser = function () {
      return vm.lobbyFactory.get('player');
    };
  }
})();


