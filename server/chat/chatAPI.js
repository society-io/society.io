var chat = {};
chat.sockets ={};
chat.len = 0;
chat.messages = [];

function broadcast (string, object) {
  for (var socketId in chat.sockets) {
    chat.sockets[socketId].emit(string, object);
  }
}

function delayBroadcast (string, object, wait) {
  for (var socketId in chat.sockets) {
    chat.sockets[socketId].delayEmit(string, object, wait);
  }
}

function addToChat (socket) {
  if (!chat.sockets.hasOwnProperty(socket.socketId)) {
    chat.sockets[socket.socketId] = socket;
    chat.len += 1;
   }
}

function removeSock (socket) {
  if (chat.sockets.hasOwnProperty(socket.socketId)) {
   delete chat.sockets[socket.socketId];
    chat.len-= 1;
  }
}

function generateUserList() {
  var userArr =[];
  for (var prop in chat.sockets) {
    userArr.push(chat.sockets[prop].profile);
  }
  var list = {};
  list.users= userArr;
  return list;
}

// Date.prototype.time = function (obj) {
//   var that = this;
//   var date = {};
//   date.day = that.getDate().toString();
//   date.month = that.toLocaleString('en-us', {month: 'short'});
//   date.time = that.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
//   if (obj === undefined) {
//     return date.time.toLocaleLowerCase() + ' -- ' + date.month + ' ' + date.day;
//   }
//   return date;
// };

module.exports = {
  chat: chat,
  addToChat: addToChat,
  broadcast: broadcast,
  delayBroadcast: delayBroadcast,
  removeSock: removeSock,
  generateUserList: generateUserList
};