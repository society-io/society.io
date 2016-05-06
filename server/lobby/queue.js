var io = require('../common');
var io = require('socket.io');
var Game = require('../game/game').Game;

var queue = [];

function addToQueue(socket) {
	queue.push(socket);
	socket.emit('added to queue');
	queueMatch(socket);
}

function queueMatch(socket) {
	if (queue.length>=2) {
		var player1 = queue.pop();
		var player2= queue.pop();
		player1.emit('match ready');
		player2.emit('match ready');
		gameInit(player1, player2);
	}
}

function gameInit(socket1, socket2){
	var game = new Game(socket1, socket2);
	game.init();
}

function disconnected(socket) {
	var index = queue.indexOf(socket.id);
	queue.splice(index, 1);
	console.log('DISCONNECTED FROM QUEUE:', queue);
}

module.exports = {
	addToQueue: addToQueue,
	queueMatch: queueMatch,
	gameInit: gameInit,
	disconnected: disconnected
};
