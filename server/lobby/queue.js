var io = require('socket.io');

var Queue = {
  storage: [],
  insert: function(socket) {
    this.storage.push(socket);
    console.log('QUEUE', this.storage.length);
    socket.on('disconnect', function(socket){
      var idx = Queue.storage.indexOf(socket);
      Queue.storage.splice(idx, 1);
      console.log(Queue.storage);
    });
  },
  remove: function () {
    var socket1 = this.storage.shift();
    var socket2 = this.storage.shift();
    return {player1: socket1, player2: socket2};
  }
};

module.exports = {
  Queue: Queue
};
