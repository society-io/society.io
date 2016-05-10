var lobbyListeners = function(socket) {
	socket.on('who am i', function() {
		socket.emit('you are', socket.user._doc);
	});
};

module.exports = {
	lobbyListeners: lobbyListeners
};