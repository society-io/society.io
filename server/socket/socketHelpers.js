var firebase = require('../common').firebase;
var mongoose = require('mongoose');

var socketInit = function(token, socket) {
	return new Promise(function(resolve, reject) {
		firebase.authWithCustomToken(token, function(err, authData)  {
			if (err) {
				reject(err);
			} else {
				resolve({
					uid: authData.auth.uid,
					socket: socket,
					token: token
				});
			}
		});
	});
};

module.exports = {
	socketInit: socketInit
};
