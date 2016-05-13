var firebase = require('../common').firebase;
var firebase = require('../common').activeSockets;

function socketCheck(token, socket) {
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
}

function disconnectListeners(socket) {
	socket.on('disconnect', function () {
		checkQueue(socket);
		checkPrivateGames(socket);
	});
}

function queueDisconnect (socket) {
	if(queueObj[socket.username]) {
		queue.splice(queue.indexOf(socket), 1);
		delete queueObj[socket.username];
		delete	activeSockets[socket.socketId];
		socket.disconnect( );
	}
}

function checkPrivateGames  (socket) {
	if (sockId_joinCode[socket.socketId]) {
		delete  privateGames[sockId_joinCode[socket.socketId]];
		delete sockId_joinCode[socket.socketId];
		delete  activeSockets[socket.socketId];
		socket.disconnect();
	}
}




module.exports = {
	socketCheck: socketCheck,
	disconnectListeners:disconnectListeners, 
	queueDisconnect:queueDisconnect, 
	privateGameDisconnect: privateGameDisconnect
};



