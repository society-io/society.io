var Game = require('../game/game').Game;
var activeSockets = require('../common').activeSockets;
var privateGames = {}; // { joinCode: [] }

var privateGameListeners = function(socket){

  socket.on('create private game', function(data){
    console.log('inside createPrivateGame listener, joinCode: ',data.joinCode);
    storeJoinCode(data);
    storePlayer1(data, socket);
  });

  socket.on('attempt to join private game', function(data){
    console.log('inside joinPrivateGame listener, joinCode: ',data.joinCode);
    storePlayer2(data, socket);
  });


  socket.on('initialize battlefield', function(data){
    console.log('inside initializeBattlefield listener, joinCode: ',data.joinCode);
    initiatePrivateGame(data, socket);
  });

  socket.on('cancel private game', function(data){
    console.log('inside cancelPrivateGame lisstener, joinCode: ',data.joinCode);
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
  console.log('privateGame players: ',players);
  var player1 = players[0];
  var player2 = players[1];
  if(players.length === 2) {
    console.log('Initiating privateGame...');
    var privateGame = new Game(players[0], players[1]);
    // Use the game's initialize method
    privateGame.init();
    // Tell the Clients that a privateGame has been initiated
    console.log('Emitting private match ready...');
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