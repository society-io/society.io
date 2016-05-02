var usersSockets = {}; // { name: socket }
var privateGames = {}; // { joinCode: [socket1, socket2] }

var privateGameListeners = function(socket){

  socket.on('newUser', storeSocket);

  socket.on('newPrivateGame', storePrivateUser1);

  socket.on('joinPrivateGame', storePrivateUser2AndInitiate);

};

var storeSocket = function(data){
  usersSockets[data.name] = socket;
  console.log(usersSockets);
};

var storePrivateUser1 = function(data){
  // Check to see if joinCode Already Exists
  if(!privateGames[data.joinCode]) { // if Not
    // create a tuple for the users' sockets
    var socketsForGame = [];
    // Get the user's socket
    socketsForGame[0] = retrieveSocket(data.name);
    // store a privateGame ready to be initiated within the privateGames obj
    privateGames[data.joinCode] = socketsForGame;
    // Tell Client that the Game is waiting for player 2 to enter joinCode
      // you could choose to show the user a "loading" view.
    socket.emit('waitingForPlayer2', {
      message: 'Great! Waiting on Player 2 to Enter your joinCode!'
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
      privateGames[data.joinCode][1] = retrieveSocket(data.name);
      initiatePrivateGame();
    } else { // if Not
      socket.emit('error', {
        message: 'error! joinCode does not match our records. Please check with your friend & try again!'
      });
    }
  }
};

var retrieveSocket = function(name){
  // Crossreference name with those in users
  for(var key in users){
    // if the request name matches one in users
    if(users[key] === name) {
      // get that user's socket
      return users[key];
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
    message: '*privateGame Created & Initiated*',
    players: privateGames[data.joinCode]
  });
};

module.exports = {
  privateGameListeners: privateGameListeners
};