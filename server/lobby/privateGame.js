var colors = require('colors');
var Game = require('../game/game').Game;
var activeSockets = require('../common').activeSockets;
var privateGames = {}; // { joinCode: [] }
var socketToCode = {}; // { socketId: joinCode }

var privateGameListeners = function(socket){

  socket.on('create private game', function(data){
    console.warn('createPrivateGame listener, joinCode: ',data.joinCode);
    storeJoinCode(data, socket);
    storePlayer1(data, socket);
  });

  socket.on('attempt to join private game', function(data){
    console.warn('joinPrivateGame listener, joinCode: ',data.joinCode);
    storePlayer2(data, socket);
  });


  socket.on('initialize battlefield', function(data){
    console.warn('initializeBattlefield listener, joinCode: ',data.joinCode);
    initiatePrivateGame(data, socket);
  });

  socket.on('get joinCode', function(){
    var id = socket.getSocketId();
    var yourJoinCode = socketToCode[id];
    socket.emit('joinCode is', {
      yourJoinCode: yourJoinCode
    });
  });

  socket.on('cancel private game', function(data){
    console.warn('cancelPrivateGame listener, joinCode: ',data.joinCode);
    cancelPrivateGame(data, socket);
  });

  socket.on('disconnect', function() {
    removeJoinCodeOf(socket.socketId);
  });

};

var storeJoinCode = function(data, socket) {
  // store joinCode in privateGames
    // create storage for sockets
    var socketsForGame = [];

    // check if join code is undefined or under 3 characters

    if(data.joinCode === undefined || data.joinCode.length < 3){
      socket.emit('err', {
        message: 'Minimum of 3 characters required.',
        success: false
      });
    }

    // Check if joinCode already exists
    if(!privateGames[data.joinCode]) {
      console.log('Storing joinCode...');
      privateGames[data.joinCode] = socketsForGame;
      socketToCode[socket.socketId] = data.joinCode;
      socket.updateRoom(data.joinCode);
    } else {
      console.log('Could Not Store joinCode');
      socket.emit('err', {
        message: 'joinCode exists!',
        success: false
      });
    }
};

var removeJoinCodeOf = function(socketId) {
  var joinCode = socketToCode[socketId];
  delete privateGames[joinCode];
  delete socketToCode[socketId];
};

var storePlayer1 = function(data, socket) {
  // Store user socket in privateGames
  console.log('Storing player1...');
  privateGames[data.joinCode][0] = socket;
  console.log('Emitting private game created...');
  socket.emit('private game created', {
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
      console.log('Emitting private game exists...');
      socket.emit('private game exists', {success: true});
      setTimeout(function(){
        socket.emit('join code to initialize battlefield', {joinCode: data.joinCode});
      }, 3000);
    } else { // if Not
      console.log('Could Not Store player2');
      socket.emit('private game exists', {
        message: 'Error! Wrong joinCode, please try again.',
        success: false
      });
    }
};


var initiatePrivateGame = function(data, socket) {
  // Create a new privateGame using the right credentials
  var players = privateGames[data.joinCode];
  console.log('privateGame Players: ',players.id);
  var player1 = players[0];
  var player2 = players[1];
  if(players.length === 2) {
    console.log('Initiating privateGame...');
    var privateGame = new Game(players[0], players[1]);
    // Use the game's initialize method
    privateGame.init();
    // Tell the Clients that a privateGame has been initiated
    player1.emit('player 1 enter battlefield', {
      message: '*privateGame Created & Initiated*',
      success: true
    });
    player2.emit('player 2 enter battlefield', {
      message: '*privateGame Created & Initiated*',
      success: true
    });
  }
};

var cancelPrivateGame = function(data, socket) {
  // Check in privateGames for the joinCode
  console.log('Canceling privateGame...');
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