var chat = {};
chat.sockets ={};
chat.len = 0;
chat.messages= [];

function broadcast (string, object) {
  for (var socketId in chat.sockets) {
    chat.sockets[socketId].emit(string, object);
  }
}
// function sendToOthers(socket, string, object, wait) {
//   var sockId = socket.socketId;
//   for (var prop in chat.sockets) {
//     if (chat.sockets[prop] === sockId) {
//       var uniqueMessage = {received: new Date()}
//       chat.sockets[prop]
//
//       .delayEmit('unique', uniqueMessage, wait)
//     }
//     else {
//       chat.sockets[prop].delayEmit(string, object, wait);
//     }
//   }
// }

function addToChat (socket) {
  if (!chat.sockets.hasOwnProperty(socket.socketId)) {
    chat.sockets[socket.socketId] = socket;
    chat.len += 1;
    console.log('CHAT OBJECT'.yellow, chat);
   }
}

function removeSock (socket) {
  if (chat.sockets.hasOwnProperty(socket.socketId)) {
   delete chat.sockets[socket.socketId];
    chat.len-= 1;
    console.log('chat socket'.cyan, chat);
  }
}

function generateUserList() {
  var userArr =[];
  for (var prop in chat.sockets) {

    userArr.push(chat.sockets[prop].profile);
    console.log('PUSHED TO PROFILE'.cyan, userArr);
  }
  var list = {};
  list.users= userArr;
  return list;
}

module.exports = {
  chat:chat,
  addToChat: addToChat,
  broadcast: broadcast,
  removeSock: removeSock,
  generateUserList: generateUserList
};

