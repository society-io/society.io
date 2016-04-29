var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var game = require('./game/Game.js');
var Game = game.Game;
var queue = require('./lobby/Queue.js');
var Queue = queue.Queue;


var port = process.env.PORT || 3000;

app.use(express.static('public'));

server.listen(port);
console.log('Server Running, Port: ', port);

var queue = Object.create(Queue);

io.on('connection', function(socket){
  console.log('*Socket Connected*');
  // Queue Insertion
  if(queue.storage.length < 2) {
    queue.insert(socket);
  }// End Queue Insertion

  // Game Instantiation
  if (queue.storage.length >= 2) {
    var playerSockets = queue.remove();
    var game = new Game(playerSockets);
    console.log("gameStats: ", game);
  }// End Game Instantiation

});

// BackEnd Sprint 1

  // socket.Emit Logic
  // on new Game instantiation,
    // server emit an onReady event
    // server listen for play event
      // server make sure there are two choices
      // server evaluate the winner/loser/tie
    // server emit an update event with the result
