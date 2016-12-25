var jwt = require('jsonwebtoken');
var jwtSecret = require('../config/config').jwtSecret;

function socketCheck(token, socket) {
	return new Promise(function(resolve, reject) {
		jwt.verify(token, jwtSecret, function(err, authData) {
			if (err) {
				reject(err);
			} else {
				console.log('authData = ', authData);
				resolve({
					uid: authData.uid,
					socket: socket,
					token: token
				});
			}
		});
	});
}

module.exports = {
	socketCheck: socketCheck
};
