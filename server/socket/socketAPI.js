var firebase = require('../common').firebase;
var privateGameListeners = require('../lobby/privateGame').privateGameListeners;
var addToQueue = require('../lobby/queue').addToQueue; 

var SocketAPI = function(socket, userModel, token) {
  // Take Out Password! (protected data)
  userModel = Object.assign({}, userModel);
  delete userModel.password;
	this.socket = socket;
	this.socketId = socket.id;
	this.user = userModel;
	this.userId = userModel._id;
	this.token = token;
};

SocketAPI.prototype.init = function() {
  privateGameListeners(this);
  addToQueue(this);
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

SocketAPI.prototype.emit = function(eventName, data) {
	this.socket.emit(eventName, data);
};

SocketAPI.prototype.deleteEvent = function(eventName) {

};

module.exports = {
  SocketAPI: SocketAPI
};