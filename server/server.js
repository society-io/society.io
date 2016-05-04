var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var db = require('./db/userModel.js');
var Game = require('./game/game').Game;
var queue = require('./lobby/queue').Queue;
var bodyParser = require('body-parser');
var cors = require('cors');

var signUp = require('./routes/signup.js');
var signIn = require('./routes/signin.js');

var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/signup', signUp);
app.use('/signin', signIn);


server.listen(port);
console.log('Server Running, Port: ', port);

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


});