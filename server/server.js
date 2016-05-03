var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./db/db');
var Game = require('./game/game').Game;
var queue = require('./lobby/queue').Queue;
var routes = require('./routes/all');
var passport = require('./auth/passport').passport;
var privateGameListeners = require('./lobby/privateGame').privateGameListeners;

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

server.listen(port);
console.log('Server Running, Port: ', port);

app.use('/auth', routes.auth);

io.on('connection', function(socket){
  console.log('*New Client Connected*');

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

  privateGameListeners(socket);

});