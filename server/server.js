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

  socket.on('privateGame', function(data){
   // Receive usernames from clients
   // Use usernames to get sockets from users obj
   // use sockets to instantiate a private game

  });

});

module.exports = {
  users: usersSockets,
  privateGames: privateGames
};

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

