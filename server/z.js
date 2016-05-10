var io = require('./common').io;
var Game = require('./game/game').Game;
var SocketAPI = require('./socket/socketAPI').SocketAPI;

var queue = [];
var sockets = {};

io.on('connection', function(socket) {
  socket.on('newGame', function() {
    sockets[socket.id] = queue.length;
    queue.push(socket);
    if (queue.length === 2) {
      var socket1 = new SocketAPI(queue.pop());
      var socket2 = new SocketAPI(queue.pop());
      new Game(socket1, socket2).init();
      console.log('*Game Instantiated*');
    }
  });
});

io.on('disconnect', function(socket) {
  queue.splice(sockets[socket.id], 1);
});
