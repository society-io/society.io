var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var activeSockets = {};
var currentSocket = {};

module.exports = {
  app: app,
  server: server,
  io: io,
  activeSockets: activeSockets,
  currentSocket: currentSocket
};
