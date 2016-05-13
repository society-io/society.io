var colors = require('colors');
var Game = require('../game/game').Game;

// console.log colorize utility
function logger (string, color) {
	var str = string.grey;
	var arrow = '-->';
	var eq = '=';
	var len = 'QUEUE LENGTH'.bgYellow + eq;
	var qObj = 'QUEUE OBJECT'.bgRed + eq;
	console.log(str, arrow, len, queue.length, qObj, queueObj);
}

var queue = [];
var queueObj = {};

setInterval(function() {
  // console.warn('queue.length-->', queue.length);
  queue.sort(function(a,b) {
    return a.getUserModel().mmr - b.getUserModel().mmr;
  });
  queueMatch();
}, 5000);


var queueListeners = function(socket) {
	socket.on('queue', function () {
		decideQueue(socket);
	});

	socket.on('disconnect', function() {
		removeFromQueue(socket);
	});
};

function decideQueue(socket) {
	if (queueObj[socket.username]) {
		socket.emit('player already in queue');
	} else {
		addToQueue(socket);
	}
}

function addToQueue (socket) {
	queue.push(socket);
	queueObj[socket.username] = true;
	socket.emit('added to queue');
	logger('ADDED TO QUEUE');
}


function queueMatch () {
	while (queue.length >= 2) {
		var player1 = queue.pop();
		logger('POPPED FROM QUEUE ARRAY');

		var player2 = queue.pop();
		logger('POPPED FROM QUEUE ARRAY');


		delete queueObj[player1.username];
		logger('DELETED FROM QUEUE OBJECT');

		delete queueObj[player2.username];
		logger('DELETED FROM QUEUE OBJECT');

		var profile = {p1: player1.getUserModel(), p2: player2.getUserModel()};
		console.log('PROFILE:'.green, profile);

		player1.delayEmit('profile', profile, 1000);
		player2.delayEmit('profile', profile, 1000);

		new Game(player1, player2).init();
		console.log('INITIATED NEW GAME'.green);
		player1.delayEmit('match ready', 1000);
		player2.delayEmit('match ready', 1000);
	}
}


function removeFromQueue (socket) {
	queue.splice(queue.indexOf(socket), 1);
	delete queueObj[socket.username];
	logger('REMOVED FROM QUEUE');
// socket.disconnect();
}

module.exports = {
	queueListeners: queueListeners,
	queueMatch: queueMatch,
	decideQueue: decideQueue,
	addToQueue: addToQueue,
	removeFromQueue: removeFromQueue
};
