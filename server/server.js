var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./db/db');
var Game = require('./game/game').Game;
var queue = require('./lobby/queue').Queue;
var routes = require('./routes/all');
var passport = require('./auth/passport');
var usersSockets = {}; // { name: socket }
var privateGames = {}; // { joinCode: [socket1, socket2] }

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

server.listen(port);
console.log('Server Running, Port: ', port);

app.use('/auth', routes.auth);

io.on('connection', function(socket){
  console.log('*Socket Connected*');

  socket.on('queue', function() {
    console.log('heard queue event');
    console.log(queue);
    // Put socket into queue
    if(queue.storage.length < 2) {
      queue.insert(socket);
    }
    // Instantiate game if more than 2 in queue
    if (queue.storage.length >= 2) {
      var playerSockets = queue.remove();
      var game = new Game(playerSockets);
      game.init();
    }
  });

  // Save User socket into users object, to be used for private games
  socket.on('newUser', function(data, socket){
    // Insert socket into users as a value for the user's name key
    usersSockets[data.name] = socket;
    console.log(usersSockets);
  });

  // PRIVATE GAMES //

  socket.on('newPrivateGame', storePrivateUser1(data));

  socket.on('joinPrivateGame', storePrivateUser2(data), initiatePrivateGame(data));

  // END PRIVATE GAMES

});

function storePrivateUser1(data){
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
}

function storePrivateUser2(data, next){
  // Crossreference joinCode with those in privateGames
  for(var key in privateGames){
    // if the request joinCode matches one within privateGames
    if(privateGames[data.joinCode]) {
      // retrieve this user's socket,
        // and store within socketsForGame of that privateGame
      privateGames[data.joinCode][1] = retrieveSocket(data.name);
      next();
    } else { // if Not
      socket.emit('error', {
        message: 'error! joinCode does not match our records. Please check with your friend & try again!'
      });
    }
  }
}

function retrieveSocket(name){
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
}

function initiatePrivateGame(data){
  // Create a new privateGame using the right credentials
  var privateGame = new Game(privateGames[data.joinCode]);
  // Use the privateGame's initialize method
  privateGame.init();
  // Tell the Clients that a privateGame has been created & initiated
  socket.emit('privateGameInitiated', {
    message: '*privateGame Created & Initiated*',
    players: privateGames[data.joinCode]
  });
}

//***************************************************//

  // Over-All Game Flow // ~Neil~

    // As each client connects,
      // server stores each clients' socket into queue.

    // When queue.length = 2,
      // server removes first 2 sockets from queue,
        // initializes a new Game with those sockets.

    // After initialization, server socket EMIT "gameReady"

    // clients sockets ON "gameReady",
      // each client enters a choice

    // clients sockets EMIT "choices",
      // send data object containing each player's choice

    // server sockets ON "choices",
      // store's each players' choice into game.choices

    // server socket EMIT "gameResult",
      // calls game.evaluateWinner(),
        // the game method returns the winner,
        // sends the winner as a socket.emit message.