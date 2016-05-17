var color = require('colors');
var chat= require('./chatAPI').chat;
var addToChat = require ('./chatAPI').addToChat;
var removeSock = require('./chatAPI').removeSock;
var broadcast = require('./chatAPI').broadcast;
var delayBroadcast = require('./chatAPI').broadcast;

var generateUserList = require('./chatAPI').generateUserList;
var sendChat= require('./chatAPI').sendChat;

function chatListeners(socket) {
  socket.on('chat', function() {
    addToChat(socket);
    socket.emit('chat');
    addChatter(socket);
  });

  socket.on('message', function(data){
    addMessage(socket, data);
  });

  socket.on('disconnect', function() {
    removeSock(socket);
    removeChatter(socket);
  });
}
// EMITTERS
function addChatter (socket) {
  var userJoined = getUserProfile(socket);
  var updatedUserList = generateUserList();
  delayBroadcast('user joined', userJoined, 2000);
  delayBroadcast('updated user list', updatedUserList, 2000);
}

function addMessage (socket, data) {
   var response = {};
   response.user = socket.profile.username;
   response.time = new Date();
   response.message = data.message;
   chat.messages.push(response);
   broadcast('message', response);
}

function removeChatter(socket) {
  var userLeftMessage = 'user left @' + new Date();
  var updateUserList = generateUserList();

  broadcast('user left', userLeftMessage);
  broadcast('updated user list', updateUserList);
}

// EMIT MESSAGE HELPERS/FORMATERS
function getUserProfile (socket){
  var obj = {};
  obj.sockId= socket.socketId;
  obj.username = socket.profile.username;
  // obj.avatar= socket.profile.avatar;
  obj.joinTime = new Date();
  return obj;
}

module.exports= {
  chatListeners: chatListeners
};