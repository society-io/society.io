var express = require('express');
var common = require('./common');
var db = require('./db/userModel.js');
var Game = require('./game/game').Game;
var queue = require('./lobby/queue');
var bodyParser = require('body-parser');
var cors = require('cors');
var socketInit = require('./socket/socketHelpers').socketInit;
var SocketAPI = require('./socket/socketAPI').SocketAPI;
var z = require('./z');

var app = common.app;
var server = common.server;
var io = common.io;

var signUp = require('./routes/signup.js');
var signIn = require('./routes/signin.js');

var port = process.env.PORT || 3000;

var activeSockets = common.activeSockets;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/signup', signUp);
app.use('/signin', signIn);


server.listen(port);
console.log('Server Running, Port: ', port);

io.on('connection', function(socket) {
  console.log('*New Client Connected*');
  socket.on('init', function(data) {
	  socketInit(data.token, socket)
      .then(function(data) {
        var uid = data.uid;
        var socket = data.socket;
        var token = data.token;
        db.findById(uid, function(err, user) {
          if (err) {
            throw err;
          } else {
            activeSockets[socket.id] = new SocketAPI(socket, user, token);
          }
        });
      }, function(err) {
        console.error(err);
      });
  });
});

