var firebase = require('../common').firebase;

var socketCheck = function(token, socket) {
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
var userListener = function(socket) {
	socket.on('who am I', function () {
	var user= this.getUserModel();
	socket.emit('you are', {user:user});
	});
};

module.exports = {
	socketCheck: socketCheck,
	userListener: userListener
};

