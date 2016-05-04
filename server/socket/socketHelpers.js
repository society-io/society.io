var firebase = require('firebase');
var mongoose = require('mongoose');

var socketInit = function(token, socket) {
	return new Promise(function(resolve, reject) {
		firebase.authWithCustomToken(data.token, function(err, authData)  {
			if (err) {
				reject(err);
			} else {
				resolve(authData.auth.uid, socket, token);
			}
		});
	});
};

socketInit
	.then(function(uid, socket, token) {
		return User.findById({uid:uid}, function(err, user) {
			if (err) {
				throw err;
			} else {
				return new SocketAPI(socket, user[0], token);
			}
		});
	});
	// .then(function(socket, uid) {
	// 	var userSocket = new Socket(socket, uid);
	// 	return userSocket;
	// })


modules.export = {socketInit: socketInit};


