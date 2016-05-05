var io = require('../common');
var io = require('socket.io');
var game = require('../game/config');

var queue = [];
//
// function decideQueue(socket) {
// 	if (queue.length === 0) {
// 		addToQueue(socket);
// 		console.log('added to queue!');
// 	} else {
// 		socket.emit('added to queue');
// 		queueMatch(socket);
// 	}
// }

function addToQueue(socket) {
	queue.push(socket);
	console.log('ADDED TO QUEUE:', queue);
	socket.emit('added to queue');
	queueMatch(socket);
}

function queueMatch(socket) {
	if (queue.length>=2) {
		var match = queue.pop();

		console.log('QUEUE MATCH: player1 = ', match,' player2 = ', socket.id);
		socket.emit('match ready');
		gameInit(activeSockets[match.id], socket);
	}
}

function gameInit(socket1, socket2){
	var game = new Game(socket1, socket2);
	game.init();
	socket.emit('game ready');
}

function disconnected(socket) {
	var index = queue.indexOf(socket.id);
	queue.splice(index, 1);
	console.log('DISCONNECTED FROM QUEUE:', queue);
}

module.exports = {
	// decideQueue: decideQueue,
	addToQueue: addToQueue,
	queueMatch: queueMatch,
	gameInit: gameInit,
	disconnected: disconnected
};
