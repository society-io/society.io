var color = require('colors');
//
// var chat = [];
//
// function chatListeners(socket) {
//   socket.on('chat', function() {
//     chat.push(socket);
//     userJoinNotification(socket);
//   });
// }
//   function userJoinNotification (socket){
//     var userJoined = {};
//     userJoined.username = socket.user.username;
//     // userJoined.avatar = socket.user.avatar;
//     userJoined.date = new Date();
//
//    socket.emit('chat', userJoined);
//    console.log('USER JOINED OBJECT'.cyan, userJoined);
//   }
//
// Date.prototype.time = function(obj) {
//   var that = this;
//   var date = {};
//
//   date.day  = that.getDate().toString();
//   date.month = that.toLocaleString('en-us', {month:'short'});
//   date.time =  that.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
//   if(obj===undefined) {
//     return  date.time.toLocaleLowerCase() + ' -- ' + date.month + ' ' + date.day;
//   }
//   return date;
// };
//
//
module.exports= {
  chatListeners:chatListeners
};

// var Chat = require('./socket/ChatAPI').Chat;
// var chatInstantiated =false;
// var chat;
// function chatListeners(socket) {
//   socket.on('initChat', function() {
//
//     if (!chatInstantiated) {
//       chat = new Chat();
//     }
//
//     chat.add(socket);
//     var userJoined = getUserProfile(socket);
//     var updateUserList = chat.getUserList();
//
//     chat.sockets.broadcast('user joined', userJoin);
//     chat.sockets.broadcast('updated userList', updateUserList);
//   });
//
//
//   socket.on('disconnect', function() {
//     var userName = socket.user.username;
//     chat.delUser(socket);
//     var userLeftMessage = 'user left @' + new Date().time('obj').time();
//     var updateUserList = chat.getUserList();
//
//     chat.sockets.broadcast('userLeft', userLeftMessage)
//     chat.sockets.broadcast('updated userList', updateUserList)
//   })
// }
//
// // CHAT HELPERS
//
// function getUserProfile (socket){
//   var obj = {};
//   obj.sockId= socket.socketId;
//   obj.username = socket.user.username;
//   obj.avatar= socket.user.avatar;
//   obj.joinTime = new Date().time();
//   return obj;
// }
//
// Date.prototype.time = function(obj) {
//   var date = {};
//     date.day  = this.getDate().toString();
//     date.month = this.toLocaleString('en-us', {month:'short'});
//     date.time =  this.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
//   if(obj===undefined) {
//    return  date.time.toLocaleLowerCase() + ' -- ' + date.month + ' ' + date.day;
//  };
//   return date;
// }









//
// var chat = [];
// var common = require('./common').io;
//
// var chat = io.connect('http://localhost:8080/#/chat')
// var chat = io
//   .of('/chat')
//   .on('connection', function (socket) {
//     socket.emit('a message', { that: 'only', '/chat': 'will get' });
//     chat.emit('a message', { everyone: 'in', '/chat': 'will get' });
//   });
//
//
// var room  = [];
// var usersInRoomList = [];
// var messageSentToRoomList = [];

//   io.on('connection', function (socket) {
//       socket.broadcast.emit('user connected');
//       socket.on('code changed', function(data) {
//         socket.broadcast.to(socket.room).emit('broadcast', data);
//       });
//
// socket.on('join', function(data) {
//        socket.room = data.link;
//        socket.name = data.name;
//        socket.join(socket.room);
//        io.sockets.in(socket.room).emit('joined', socket.name)
//      })
//
//      socket.on('endSession', function() {
//        socket.leave(socket.room);
//      });
//
//      socket.on('typing', function (data) {
//        if(data === socket.name) {
//          io.sockets.in(socket.room).emit('typing', data);
//        }
//      });
//
//      socket.on('untyping', function () {
//        io.sockets.in(socket.room).emit('untyping')
//      });
//    });
//  };
// }
//

// socket.on('init', function (data) {
//    current_username =  data.name;
//    $scope.name = data.name;
//    $scope.users = data.users;
//  });
//
//
// function chatListeners(socket) {
// 	socket.on('chat', function () {
//    var newUserBroadcast = {}
//    newUserBroadcast.message = user + 'has joined!'
// 		chat.broadcast('user joined chat', newUserBroadcast)
// 	});
//
// socket.on('message fr', function(message) {
// 	var newMess = {};
// 	newMess.data = message.data;
// 	io.to('chat').emit('message', 'joined');
// });
// }
//
//
// module.exports = {
// 	chatListeners:chatListeners
// }

