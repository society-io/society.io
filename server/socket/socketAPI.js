var firebase = require('../common').firebase;

var SocketAPI = function(socket, userModel, token) {
// look up user in database
	this.socket = socket;
	this.socketId = socket.id;
	this.user = userModel;
	this.userId = userModel._id;
	this.token = token;
	
	// this.socketListeners = socket.listeners;
	// this.socketEmitters = socket.emitter;
	// this.privateGames={};
};

SocketAPI.prototype.on = function(event, cb, verify) {
	if(verify) {
		this.socket.on(event, cbWrapper.bind(this));
	} else {
		this.socket.on(event, cb);
	}
  function cbWrapper(data) {
    firebase.authWithCustomToken(data.token, function(err, authData) {
      if(err) { this.emit('err'); }
      cb(data);
    });
  }
};

SocketAPI.prototype.emit = function(eventName, callback) {
	this.socket.emit(eventName, callback.apply(this.socket, args));
};

SocketAPI.prototype.deleteEvent = function(eventName) {

};

module.exports = {
  SocketAPI: SocketAPI
};
