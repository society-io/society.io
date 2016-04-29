var Queue = {
  storage: [],
  insert: function(socket) {
    this.storage.push(socket);
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