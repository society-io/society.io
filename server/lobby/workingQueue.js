var Game = require('../game/game').Game;

var queue = [];

var queueListeners = function(socket) {
	
	socket.on('queue', function () {
		addToQueue(socket);
	});

	socket.removeListener('queue', function() {
		addToQueue(socket);
		console.log('listeners: ', socket.listeners);
	});

	socket.once('remove from queue', function(){
		disconnected(socket);
	});
	socket.on('disconnect', function(){
		disconnected(socket);
	});

};

function addToQueue(socket) {
	queue.push(socket);
	socket.emit('added to queue');
	console.log('ADDED TO QUEUE: ', queue.length);

	queueMatch(socket);
}

function queueMatch(socket) {

	if (queue.length>=2) {
		var player1= queue.shift();
		var player2= queue.shift();

		var profile = {};

		var p1 = player1.getUserModel();
		var p2 = player2.getUserModel();

		profile.player1 = p1;
		profile.player2 = p2;

		setTimeout(function(){
			player1.emit('profile', profile);
			player2.emit('profile', profile);
		}, 1000);

		console.log('PLAYER PROFILES: ', profile);

		var game= new Game(player1, player2);
		game.init();

		setTimeout(function(){
			player1.emit('match ready');
			player2.emit('match ready');
		}, 1000);

	console.log('MATCH READY: ' +
							'player1: ', player1.socketId,
							'player2: ', player2.socketId);
	}

}

function disconnected(socket) {
	var index= queue.indexOf(socket.id);
	queue.splice(index, 1);
	socket.disconnect();
	console.log('DISCONNECTED FROM QUEUE:', queue);
}

module.exports = {
	queueListeners: queueListeners,
	addToQueue: addToQueue,
	queueMatch: queueMatch,
	disconnected: disconnected
};

