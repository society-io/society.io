var activeSockets = require('../common').activeSockets;
var privateGames = {}; // { joinCode: [] }

var privateGameListeners = function(socket){
  console.log('inside privateGameListeners');

  socket.on('create room', function(data){
    console.log('onCreateRoomData: ',data);
    storeJoinCode(data);
    storePlayer1(data, socket);
  });

  socket.on('join room', function(data){
    console.log('onJoinRoomData: ',data);
    storePlayer2(data, socket);
  });

  socket.on('joined room', function(data){
    initiatePrivateGame(data, socket);
  });

};

var storeJoinCode = function(data) {
  // store joinCode in privateGames
    // create storage for sockets
    var socketsForGame = [];
    // Check if joinCode already exists
    if(!privateGames[data.joinCode]) {
      privateGames[data.joinCode] = socketsForGame;
      // privateGames = { joinCode: []}
    } else {
      socket.emit('err', {
        message: 'joinCode exists!',
        success: false
      });
    }
};

var storePlayer1 = function(data, socket) {
  // Store user socket in privateGames
  privateGames[data.joinCode][0] = socket;
  socket.emit('room created', {
    message: 'Player 1 inserted! Waiting on Player 2...',
    success: true
  });
};

var storePlayer2 = function(data, socket) {
  // Crossreference joinCode with those in privateGames
  for(var key in privateGames){
    // if the request joinCode matches one within privateGames
    if(privateGames[data.joinCode]) {
      // store socket within socketsForGame[1] of privateGames[joinCode]
      privateGames[data.joinCode][1] = socket;
      socket.emit('room exists', {success: true});
    } else { // if Not
      socket.emit('room exists', {
        message: 'error! joinCode does not match our records. Please check with your friend & try again!',
        success: false
      });
    }
  }
};

var initiatePrivateGame = function(data, socket){
  // Create a new privateGame using the right credentials
  var players = privateGames[data.joinCode];
  if(players.length === 2) {
    var privateGame = new Game(players);
    // Use the game's initialize method
    privateGame.init();
    // Tell the Clients that a privateGame has been created & initiated
    socket.emit('match ready', {
      message: '*privateGame Created & Initiated*',
      players: players,
      success: true
    });
  }
};

module.exports = {
  privateGameListeners: privateGameListeners
};
