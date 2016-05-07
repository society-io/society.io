var Game = require('../game/game').Game;

var queue = [];

var queueListeners = function(socket) {
	socket.on('queue', function () {
		addToQueue(socket);
	});
	socket.on('remove from queue', function(){
		disconnected(socket);
	});
	socket.on('disconnect', function(){
		disconnected(socket);
	});
};


var userListener = function(socket) {
	var user= this.getUserModel();
};

function addToQueue(socket) {
	queue.push(socket);
	console.log('Queue length: ', queue.length);
	console.log('now this is the queue: ', queue);
	socket.emit('added to queue');
	queueMatch(socket);
}

function queueMatch(socket) {
	if (queue.length >= 2) {
		var player1 = queue.shift();
		console.log('this is player1: ', player1);
		var player2 = queue.shift();
		console.log('this is player2: ', player2);


		var game = new Game(player1, player2);
		game.init();

		setTimeout(function(){
			player1.emit('match ready');
			player2.emit('match ready');
		}, 1000);

		console.log('MATCH: player1 = ', player1.socketId, 'player2 = ', player2.socketId);
	}
}

function disconnected(socket) {
	var index = queue.indexOf(socket.id);
	queue.splice(index, 1);
	console.log('DISCONNECTED FROM QUEUE:', queue);
}

module.exports = {
	queueListeners: queueListeners,
	addToQueue: addToQueue,
	queueMatch: queueMatch,
	disconnected: disconnected
};
