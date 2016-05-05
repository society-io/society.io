var io = require('../common').io;

var queue = {
  storage: [],
  insert: function(socket) {
    this.storage.push(socket);
    console.log('QUEUE', this.storage.length);
    socket.on('disconnect', function(socket) {
      var idx = Queue.storage.indexOf(socket);
      Queue.storage.splice(idx, 1);
      socket.emit('added to queue');
      console.log(Queue.storage);
    });
  },
  remove: function () {
    var socket1 = this.storage.shift();
    var socket2 = this.storage.shift();
    socket.emit('match ready');
    return {player1: socket1, player2: socket2};
  }
};

io.on('queue', function(socket) {
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

module.exports = {
  queue: queue
};
