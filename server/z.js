var io = require('./common').io;
var Game = require('./game/game').Game;

var queue = [];
var sockets = {};

io.on('connection', function(socket) {
  socket.on('newGame', function() {
    console.log('hi');
    sockets[socket.id] = queue.length;
    queue.push(socket);
    if (queue.length === 2) {
      console.log('instantiating game!');
      new Game({
        player1: queue.pop(),
        player2: queue.pop()
      }).init();
    }
  });
});

io.on('disconnect', function(socket) {
  queue.splice(sockets[socket.id], 1);
});
