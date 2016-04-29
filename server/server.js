var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./db/db.js');
var game = require('./game/game.js');
var Game = game.Game;
var queue = require('./lobby/queue.js').Queue;

var port = process.env.PORT || 3000;

app.use(express.static('public'));

server.listen(port);
console.log('Server Running, Port: ', port);

io.on('connection', function(socket){
  console.log('*Socket Connected*');

  // Put socket into queue
  if(queue.storage.length < 2) {
    queue.insert(socket);
  }

  // Instantiate game if more than 2 in queue
  if (queue.storage.length >= 2) {
    var playerSockets = queue.remove();
    var game = new Game(playerSockets);
    game.init();
    console.log("gameStats: ", game);
  }

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
