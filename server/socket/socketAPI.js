// var eventEmitter = require('events');
var firebase = require('../common').firebase;
var privateGameListeners = require('../lobby/privateGame').privateGameListeners;
var queueListeners = require('../lobby/queue').queueListeners;
var lobbyListeners = require('../lobby/lobby').lobbyListeners;
var chatListeners = require('../lobby/chat').chatListeners;

var SocketAPI = function(socket, userModel, token) {
// socket
  this.socket = socket;
  this.connected = socket.connected;
  this.disconnected = socket.disconnected;
  this.socketId = socket.id;
  this.events = socket._events;
// user
	userModel = Object.assign({}, userModel);
	this.user = userModel;
	this.profile = this.user._doc;
	this.token = token;
};

SocketAPI.prototype.init = function() {
	delete this.user.password;
	console.log('this.profile'.magenta, this.profile);
  console.log('this.user._doc'.magenta, this.user._doc);

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
};

SocketAPI.prototype.emit = function(event, data) {
	this.socket.emit(event, data);
	console.log('EMIT:'.bgCyan,'-->'.cyan, event, data);
	// this.emitters[event]=this.socketId;
};

SocketAPI.prototype.delayEmit = function(event, data, wait){
	var sock = this;
	setTimeout(function () {
		sock.emit(event, data);
		console.log('DELAYED EMIT'.bgYellow, event,'DATA SENT'.bgYellow, data);
	});
};

SocketAPI.prototype.getUserModel = function() {
	return this.user;
};

SocketAPI.prototype.updateStats = function(obj) {
  this.user.mmr = obj.mmr;
  this.user.wins = obj.wins;
  this.user.losses = obj.losses;
};

SocketAPI.prototype.err = function(err) {
	this.socket.error(err);
};

SocketAPI.prototype.disconnect = function(close) {
	this.socket.disconnect(close);
	// this.socket.disconnected = true;
	// this.socket.connected = false;
};




module.exports = {
  SocketAPI: SocketAPI
};