var activeSockets = require('../common').activeSockets;
var privateGames = {}; // { joinCode: [] }

var privateGameListeners = function(socket){

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

  socket.on('cancel room', function(data){
    console.log('joinCode: ',data.joinCode);
    cancelPrivateGame(data, socket);
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
  console.log('privateGames: ',privateGames);
  socket.emit('room created', {
    message: 'Player 1 inserted! Waiting on Player 2...',
    success: true,
    joinCode: data.joinCode
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
        success: false,
        joinCode: data.joinCode
      });
    }
  }
};

var initiatePrivateGame = function(data, socket) {
  // Create a new privateGame using the right credentials
  var players = privateGames[data.joinCode];
  if(players.length === 2) {
    var privateGame = new Game(players[0], players[1]);
    // Use the game's initialize method
    privateGame.init();
    // Tell the Clients that a privateGame has been created & initiated
    console.log('about to emit match ready');
    socket.emit('match ready', {
      message: '*privateGame Created & Initiated*',
      players: players,
      success: true
    });
  }
};

var cancelPrivateGame = function(data, socket) {
  // Check in privateGames for the joinCode
  console.log('canceling privateGame...');
  for(var key in privateGames) {
    if(data.joinCode === key) {
      delete privateGames[key];
      console.log('privateGames: ',privateGames);
    } else {
      socket.emit('err', {
        message: 'joinCode not found! Please Try Again...',
        success: false
      });
    }
  }
};

module.exports = {
  privateGameListeners: privateGameListeners
};