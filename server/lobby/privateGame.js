var activeSockets = require('../common').activeSockets;
var privateGames = {}; // { joinCode: [] }

var privateGameListeners = function(socket){

  socket.on('create room', function(data){
    console.log('inside createRoom listener, joinCode: ',data.joinCode);
    storeJoinCode(data);
    storePlayer1(data, socket);
  });

  socket.on('join room', function(data){
    console.log('inside joinRoom listener, joinCode: ',data.joinCode);
    storePlayer2(data, socket);
  });


  socket.on('joined room', function(data){
    console.log('inside joinedRoom listener, joinCode: ',data.joinCode);
    initiatePrivateGame(data, socket);
  });

  socket.on('cancel room', function(data){
    console.log('inside cancelRoom listener, joinCode: ',data.joinCode);
    cancelPrivateGame(data, socket);
  });

};

var storeJoinCode = function(data) {
  // store joinCode in privateGames
    // create storage for sockets
    var socketsForGame = [];
    // Check if joinCode already exists
    if(!privateGames[data.joinCode]) {
      console.log('Storing joinCode...');
      privateGames[data.joinCode] = socketsForGame;
    } else {
      console.log('Could Not Store joinCode');
      socket.emit('err', {
        message: 'joinCode exists!',
        success: false
      });
    }
};

var storePlayer1 = function(data, socket) {
  // Store user socket in privateGames
  console.log('Storing player1...');
  privateGames[data.joinCode][0] = socket;
  console.log('Emitting room created...');
  socket.emit('room created', {
    message: 'Player 1 inserted! Waiting on Player 2...',
    success: true
  });
};

var storePlayer2 = function(data, socket) {
  // Crossreference joinCode with those in privateGames
    // if the request joinCode matches one within privateGames
    if(privateGames[data.joinCode]) {
      // store socket within socketsForGame[1] of privateGames[joinCode]
      console.log('Storing player2...');
      privateGames[data.joinCode][1] = socket;
      setTimeout(function(){
        console.log('Emitting room exists...');
        socket.emit('room exists', {success: true});
        console.log('Emitting here is joinCode...');
        socket.emit('here is joinCode', {joinCode: data.joinCode});
      }, 3000);
    } else { // if Not
      console.log('Could Not Store player2');
      socket.emit('room exists', {
        message: 'error! joinCode does not match our records. Please check with your friend & try again!',
        success: false
      });
    }
};

var initiatePrivateGame = function(data, socket) {
  // Create a new privateGame using the right credentials
  var players = privateGames[data.joinCode];
  if(players.length === 2) {
    console.log('Initiating privateGame...');
    var privateGame = new Game(players[0], players[1]);
    // Use the game's initialize method
    privateGame.init();
    // Tell the Clients that a privateGame has been created & initiated
    console.log('Emitting private match ready...');
    socket.emit('private match ready', {
      message: '*privateGame Created & Initiated*',
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
    } else {
      console.log('Could Not Cancel privateGame');
      socket.emit('err', {
        message: 'joinCode not found! Please Try Again.',
        success: false
      });
    }
  }
};

module.exports = {
  privateGameListeners: privateGameListeners
};