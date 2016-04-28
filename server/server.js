var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

app.use(express.static('public'));

server.listen(port);
console.log('Server is Running on Port: ', port);

io.on('connection', function(socket){
  console.log('Socket Connected!');
  socket.emit('rock', {
    message: 'rock'
  });
});

// BackEnd Sprint 1

  // A User enters a io.connection
  // Their socket is placed into Queue
  // When theres two people in Queue,
    // Instantiate new Game with both sockets

  // Game Logic
  // on new Game instantiation,
    // server emit an onReady event
    // server listen for play event
      // server make sure there are two choices
      // server evaluate the winner/loser/tie
    // server emit an update event with the result