// var eventEmitter = require('events');
var firebase = require('../common').firebase;
var privateGameListeners = require('../lobby/privateGame').privateGameListeners;
var queueListeners = require('../lobby/queue').queueListeners;
var lobbyListeners = require('../lobby/lobby').lobbyListeners;
var chatListeners = require('../chat/chat').chatListeners;

var SocketAPI = function(socket, userModel, token) {

// socket
  this.socket = socket;
  this.socketId = this.socket.id;
  this.events = socket._events;
  this.eventsCount = socket._eventsCount;
  this.listeners = {};
  this.emitters = {};

// user
	userModel = Object.assign({}, userModel);
	this.user = userModel;
  this.profile = this.user;
	this.userId = this.user._doc._id;
	this.token = token;
	this.username =this.user._doc.username;
};

SocketAPI.prototype.init = function() {
	delete this.user._doc.password;
	lobbyListeners(this);
  queueListeners(this);
  privateGameListeners(this);
  chatListeners(this);
	this.emit('socket initialized');
};

SocketAPI.prototype.on = function(event, cb, auth) {
  if (auth) {
    this.socket.on(event, authenticate.bind(this));
  } else {
    this.socket.on(event, cb);
	  console.log('ON:'.bgMagenta,'-->'.magenta, event);
  }
	function authenticate(data) {
    firebase.authWithCustomToken(data.token, function(err, authData) {
      if(err) {this.emit('err');}
      cb(data);
    });
  }
	this.listeners[event]=this.socketId;
};

SocketAPI.prototype.once= function (event, cb) {
	this.socket.once(event, cb);
};

SocketAPI.prototype.emit = function(event, data) {
	this.socket.emit(event, data);
	console.log('EMIT:'.bgCyan,'-->'.cyan, event, data);
	this.emitters[event]=this.socketId;
};

SocketAPI.prototype.delayEmit = function(event, data, wait){
	var sock = this;
	setTimeout(function () {
		sock.emit(event, data);
		console.log('DELAYED EMIT'.bgYellow, event,'DATA SENT'.bgYellow, data);
	});
};

SocketAPI.prototype.getUserModel = function() {
	return this.user._doc;
};

SocketAPI.prototype.updateStats = function(obj) {
  this.user._doc.mmr = obj.mmr;
  this.user._doc.wins = obj.wins;
  this.user._doc.losses = obj.losses;
};

SocketAPI.prototype.getUsername = function() {
	return this.user._doc.username;
};

SocketAPI.prototype.getSocketId = function () {
    return this.socketId;
};

SocketAPI.prototype.err = function(err) {
	this.socket.error(err);
};

SocketAPI.prototype.disconnect = function() {
	this.socket.disconnect();
};



module.exports = {
  SocketAPI: SocketAPI
};