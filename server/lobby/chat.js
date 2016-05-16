var color = require('colors');
var chat= require('../socket/chatAPI').chat;

function chatListeners(socket) {
  socket.on('chat', function() {
    chat.add(socket);
    addChatter(socket);
  });
  socket.on('hello', function(message){
  console.log('message received');
    formatMessage(socket, message);
  });
  socket.on('disconnect', function() {
    var userName = socket.profile.username;
    chat.delUser(socket);
  });
}

function addChatter (socket) {
  var userJoined = getUserProfile(socket);
  var updatedUserList = {userList: chat.userList};

  socket.delayEmit('chat', userJoined, 2000);
  socket.delayEmit('updated user list', updatedUserList, 5000 );
}

function removeChatter(socket) {
  var userLeftMessage = 'user left @' + new Date().time;
  var updateUserList = chat.getUserList();

  socket.delayEmit('userLeft', userLeftMessage, 2000);
  socket.delayEmit('updated userList', updateUserList, 2000);
}


function getUserProfile (socket){
  var obj = {};
  obj.sockId= socket.socketId;
  obj.username = socket.profile.username;
  obj.avatar= socket.profile.avatar;
  obj.joinTime = new Date();
  return obj;
}

formatMessage = function(socket, message) {
  var response = {};
  response.user = socket.profile.username;
  response.time = new Date();
  response.message = message.message;
  chat.messages.push(response);
  chat.snd(response);
};

module.exports= {
  chatListeners:chatListeners
};



