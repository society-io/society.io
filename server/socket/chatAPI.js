// var io = require('./common').io;
//

//
// var Chat = function() {
//   this.sockets= {length: 0};
//   this.chatUsers = {length:0};
//   this.messages: [];
// }
// // Chat.prototype = Object.create(Socket.prototype)
//
// Chat.prototype.add =function(socket){;
// if (!this.sockets.hasOwnProperty(socket.socketId)) {
//     this.sockets[socket.socketId] = socket.socket;
//     this.chatUsers[socket.socketId]= socket.user;
//
//     this.sockets.length +=1;
//     this.chatUsers.length+=1;
//    }
//  };
//
// Chat.prototype.delUser = function(socket) {
//   if (this.sockets.hasOwnProperty(socket.socketId)) {
//
//     delete this.sockets[socket.socketId];
//     delete this.chatUsers[socket.socketId];
//
//     this.sockets.length -= 1;
//     this.chatUsers.length -= 1;
//   }
// }
//
// Chat.prototype.getUserList = function() {
//   var userList = [];
//   for (var prop in sockets) {
//     if (!socket[prop][connected]) {
//       var temp = socket[prop]
//       delete chatUsers[temp];
//       delete temp;
//     } else {
//       userList.push(chatUser[socket[prop]].username);
//     }
//     return userList;
//   }
// }
//
// module.exports = {
//   Chat:Chat
// };
