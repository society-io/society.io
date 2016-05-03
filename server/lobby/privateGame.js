var userFBID = require('../auth/passport').userFBID;
var userPhoto = require('../auth/passport').userPhoto;
var userSockets = {}; // { userFBID: socket }
var privateGames = {}; // { joinCode: [socket1, socket2] }
var userPics = {}; // { userFBID: userPhoto }

var privateGameListeners = function(socket){

  socket.on('newUser', associateSocketAndPhoto);

  socket.on('newPrivateGame', storePrivateUser1);

  socket.on('joinPrivateGame', storePrivateUser2AndInitiate);

};

var associateSocketAndPhoto = function(){
  usersSockets[userFBID] = socket;
  console.log(userSockets);
  userPics[userFBID] = userPhoto;
  console.log(userPics);
};

var storePrivateUser1 = function(data){
  // Check to see if joinCode Already Exists
  if(!privateGames[data.joinCode]) { // if Not
    // create a tuple for the users' sockets
    var socketsForGame = [];
    // Get the user's socket
    socketsForGame[0] = retrieveSocket(data.fbid);
    // store a privateGame ready to be initiated within the privateGames obj
    privateGames[data.joinCode] = socketsForGame;
    // Tell Client that the Game is waiting for player 2 to enter joinCode
      // you could choose to show the user a "loading" view.
      // send Client the picture of the loaded user
    var player1Pic = retrievePicture(data.fbid);
    socket.emit('waitingForPlayer2', {
      message: 'Great! Waiting on Player 2 to Enter your joinCode!',
      player1: player1Pic
    });
  } else { // if Yes
    socket.emit('error', {
      message: 'error! joinCode in use! Please enter a unique one.'
    });
  }
};

var storePrivateUser2AndInitiate = function(data){
  // Crossreference joinCode with those in privateGames
  for(var key in privateGames){
    // if the request joinCode matches one within privateGames
    if(privateGames[data.joinCode]) {
      // retrieve this user's socket,
        // and store within socketsForGame of that privateGame
      privateGames[data.joinCode][1] = retrieveSocket(data.fbid);
      var player2pic = retrievePicture(data.fbid);
      socket.emit('player2Pic', {
        player2: player2pic
      });
      initiatePrivateGame();
    } else { // if Not
      socket.emit('error', {
        message: 'error! joinCode does not match our records. Please check with your friend & try again!'
      });
    }
  }
};

var retrieveSocket = function(fbid){
  // Crossreference fbid with those in userSockets
  for(var key in userSockets){
    // if the request fbid matches one in userSockets
    if(userSockets[key] === fbid) {
      // get that user's socket
      return userSockets[key];
    } else { // if Not
      // Tell Client that user isn't connected
      socket.emit('error', {
        message: 'error! User socket NOT connected!'
      });
    }
  }
};

var retrievePicture = function(fbid){
  // Crossreference fbid with those in userPics
  for(var key in userPics){
    // if the request fbid matches one in userPics
    if(userPics[key] === fbid) {
      // get that user's picture url
      return userPics[key];
    } else { // if Not
      // Tell Client that user isn't connected
      socket.emit('error', {
        message: 'error! User socket NOT connected!'
      });
    }
  }
};

var initiatePrivateGame = function(data){
  // Create a new privateGame using the right credentials
  var privateGame = new Game(privateGames[data.joinCode]);
  // Use the privateGame's initialize method
  privateGame.init();
  // Tell the Clients that a privateGame has been created & initiated
  socket.emit('privateGameInitiated', {
    message: '*privateGame Created & Initiated*'
  });
};

module.exports = {
  privateGameListeners: privateGameListeners
};