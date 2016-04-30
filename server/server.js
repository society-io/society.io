var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./db/db');
var Game = require('./game/game').Game;
var queue = require('./lobby/queue').Queue;
var routes = require('./routes/all');
var passport = require('./auth/passport');
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

server.listen(port);
console.log('Server Running, Port: ', port);

// app.use('/auth', routes.auth);

io.on('connection', function(socket){
  console.log('*Socket Connected*');
  socket.on ('queue', function(socket) {
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
});

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
