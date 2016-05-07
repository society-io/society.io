var firebase = require('../common').firebase;
var privateGameListeners = require('../lobby/privateGame').privateGameListeners;
var queueListeners = require('../lobby/queue').queueListeners;

var SocketAPI = function(socket, userModel, token) {
  userModel = Object.assign({}, userModel);
	this.socket = socket;
	this.socketId = socket.id;
	this.user = userModel;
	this.userId = userModel._id;
	this.token = token;
};

SocketAPI.prototype.init = function() {
	delete this.user._doc.password;
  privateGameListeners(this);
  queueListeners(this);
};

SocketAPI.prototype.on = function(event, cb, auth) {
  if(auth) {
    this.socket.on(event, authenticate.bind(this));
  } else {
    this.socket.on(event, cb);
  }
	function authenticate(data) {
    firebase.authWithCustomToken(data.token, function(err, authData) {
      if(err) { this.emit('err'); }
      cb(data);
    });
  }
};

SocketAPI.prototype.emit = function(eventName, data) {
	this.socket.emit(eventName, data);
};

SocketAPI.prototype.getUserModel = function() {
	return this.user._doc;
};

SocketAPI.prototype.deleteEvent = function(eventName) {
};



module.exports = {
  SocketAPI: SocketAPI
};
