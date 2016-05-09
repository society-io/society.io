var express = require('express');
var common = require('./common');
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./db/userModel.js');
var Game = require('./game/game').Game;
var queue = require('./lobby/queue');
var socketCheck = require('./socket/socketHelpers').socketCheck;
var SocketAPI = require('./socket/socketAPI').SocketAPI;

var app = common.app;
var server = common.server;
var io = common.io;
var activeSockets = common.activeSockets;

var signUp = require('./routes/signup.js');
var signIn = require('./routes/signin.js');
var leaderboard = require('./routes/leaderboard.js');

var port = process.env.PORT || 3000;


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/signup', signUp);
app.use('/signin', signIn);
app.use('/leaderboard', leaderboard);

server.listen(port);
console.log('Server Running, Port: ', port);

io.on('connection', function(socket) {
  console.log('*New Client Connected*');
  socket.on('init', function(data) {

    socketCheck(data.token, socket)
      .then(function(data) {
        var uid = data.uid;
        var socket = data.socket;
        var token = data.token;
        db.findById(uid, function(err, user) {
          if (err) {
            throw err;
          } else {
            activeSockets[socket.id] = new SocketAPI(socket, user, token);
            activeSockets[socket.id].init();
          }
        });
      }, function(err) {
        console.error(err);
      });
  });
});
