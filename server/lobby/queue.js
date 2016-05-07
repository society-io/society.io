var io = require('../common');
var io = require('socket.io');
var Game = require('../game/game').Game;

var queue = [];

var queueListeners = function(socket) {
	socket.on('queue', function () {
		addToQueue(socket);
	});
};


var userListener = function(socket) {
	var user= this.getUserModel();
};

function addToQueue(socket) {
	queue.push(socket);
	console.log('ADDED TO QUEUE: ', queue.length);
	socket.emit('added to queue');
	queueMatch(socket);
}

function queueMatch(socket) {
	if (queue.length>=2) {
		var player1 = queue.shift();
		var player2= queue.shift();
		
		var profile = {}; 
		profile.player1.getUserModel();
		profile.player2.getUserModel();
	
		console.log(profile);
		
		var game= new Game(player1, player2);
		game.init();

		player1.emit('match ready');
		player2.emit('match ready');
		
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
