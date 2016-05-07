var firebase = require('../common').firebase;
var privateGameListeners = require('../lobby/privateGame').privateGameListeners;
var queueListeners = require('../lobby/queue').queueListeners;
var eventEmitter = require('events');

var SocketAPI = function(socket, userModel, token) {
// socket
	userModel = Object.assign({}, userModel);
	this.socket = socket;
	this.socketId = socket.id;
	this.events = socket._events;
	this.eventsCount = socket._eventsCount;
	this.listeners = {};
	this.emitters = {};
// user
	this.user = userModel;
	this.userId = userModel._id;
	this.token = token;
};

SocketAPI.prototype.init = function() {
	delete this.user._doc.password;
  queueListeners(this);
  privateGameListeners(this);
};

SocketAPI.prototype.on = function(event, cb, auth) {
  if (auth) {
    this.socket.on(event, authenticate.bind(this));
  } else {
    this.socket.on(event, cb);
  }
	function authenticate(data) {
    firebase.authWithCustomToken(data.token, function(err, authData) {
      if(err) {this.emit('err');}
      cb(data);
    });
  }
	this.listeners[event]=this.socketId;
  console.log('LISTENERS OBJ: ', this.listeners);
};

SocketAPI.prototype.once= function (event, cb) {
	this.socket.once(event, cb);
};

SocketAPI.prototype.emit = function(event, data) {
	this.socket.emit(event, data);
	this.emitters[event]=this.socketId;
	 console.log('EMITTERS ARRAY: ', this.emitters);
};

SocketAPI.prototype.getUserModel = function() {
	return this.user._doc;
};

SocketAPI.prototype.err = function(err) {
	this.socket.error(err);
};

SocketAPI.prototype.disconnect = function() {
	this.socket.disconnect();
};

SocketAPI.prototype.cleanup = function(){
	this.socket.cleanup();
};

module.exports = {
  SocketAPI: SocketAPI
};
