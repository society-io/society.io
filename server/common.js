var Firebase = require('firebase');
var firebase = new Firebase('https://blistering-torch-6348.firebaseio.com/');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var activeSockets = {};
var currentSocket = {};

module.exports = {
  firebase: firebase,
  app: app,
  server: server,
  io: io,
  activeSockets: activeSockets,
  currentSocket: currentSocket
};

