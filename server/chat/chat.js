var color = require('colors');
var chat = require('./chatAPI').chat;
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

  socket.on('new message', function(data){
    addMessage(socket, data);
  });

  socket.on('disconnect', function() {
    removeSock(socket);
    removeChatter(socket);
  });
}
// EMITTERS
function addChatter (socket) {
  var newUser = {};
  newUser.avatar = socket.avatar;
  newUser.message = socket.username + ' joined @ ' + formatTime() + ' !';
  var updatedUserList = generateUserList();
  delayBroadcast('user joined', newUser, 2000);
  delayBroadcast('updated user list', updatedUserList, 2000);
}

function addMessage (socket, data) {
   var response = {};
   response.avatar = socket.avatar;
   response.user = socket.username;
   response.time = formatTime();
   response.message = data.message;
   chat.messages.push(response);
   broadcast('message', response);
}

function removeChatter(socket) {
  var userLeftMessage = 'user left @' + formatTime();
  var updateUserList = generateUserList();

  broadcast('user left', userLeftMessage);
  broadcast('updated user list', updateUserList);
}

// EMIT MESSAGE HELPERS/FORMATERS
function getUserProfile (socket){
  var obj = {};
  obj.avatar = socket.avatar;
  obj.username = socket.username;
  obj.joinTime = formatTime();
  return obj;
}

function formatTime() {
  var time = new Date();
  var firstHalf = time.getHours();
  var secondHalf = time.getMinutes();
  var formattedTime;
  if(secondHalf<10) {
    secondHalf = '0' + secondHalf;
  } else {
    secondHalf = secondHalf;
  }
  if(firstHalf>12) {
    firstHalf = firstHalf - 12;
    formattedTime = firstHalf +':'+ secondHalf + 'PM';
  } else {
    formattedTime = firstHalf +':'+ secondHalf +'AM';
  }
  return formattedTime;
}

module.exports= {
  chatListeners: chatListeners
};