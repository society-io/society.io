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

    chat.userList.push(socket.profile.username);
    chat.sockList.push(socket.socketId);

    chat.sockets.length += 1;
    // chat.users.length += 1;

    console.log('CHAT OBJECT', chat.userUsers);
   }
};

chat.delUser = function(socket) {
  if (chat.sockets.hasOwnProperty(socket.socketId)) {

    delete chat.sockets[socket.socketId];
    chat.sockets.length -= 1;

    var position = chat.userList.indexOf(socket.profile.username);
    if (position >= 0 ) {
      chat.userList.splice(postion, 1);
    }
  }
};

chat.send =function(message){
  var sock = chat.sockList;
  for (var i = 0; i < sock.len; i++) {
    var id = socket[i];
    chat.socket[id].emit('message', message);
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
