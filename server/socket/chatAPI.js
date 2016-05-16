var chat = {};
chat.sockets= {length: 0};
// chat.users = {length:0};
chat.sockList = [];
chat.userList =[];
chat.messages= [];

chat.add =function(socket){
  if (!chat.sockets.hasOwnProperty(socket.socketId)) {
    chat.sockets[socket.socketId] = socket;
    // chat.users[socket.socketId]= socket.profile;
    chat.sockets.length += 1;
    chat.sockList.push(socket);
    chat.userList.push(socket.profile.username);
    // chat.users.length += 1;
    console.log('CHAT OBJECT', chat.userUsers);
   }
};

chat.delUser = function(socket) {
  if (chat.sockets.hasOwnProperty(socket.socketId)) {
    delete chat.sockets[socket.socketId];
    chat.sockets.length -= 1;
    var position = chat.sockList.indexOf(socket);
      if (position >= 0 ) {
        chat.sockList.splice(postion, 1);
      }
    var idx = chat.userList.indexOf(socket.profile.username);
    if (idx >= 0 ) {
      chat.userList.splice(postion, 1);
    }
  }
};

chat.snd =function(message){
  var sock = chat.sockList;
  for (var i = 0; i < sock.length; i++) {
    sock[i].delayEmit('message', message, 1000);
    console.log('MESSAGE', message);
  }
};

chat.getUserList = function() {
  var userList = {};
  userList.list = chat.userList;
  return userList;
};

module.exports = {
  chat:chat
};
