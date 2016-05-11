var colors = require('colors');
var Game = require('../game/game').Game;

// console.log colorize utility
function logger (string, color){
	var str = string.cyan;
	var arrow = '-->';
	var eq = '=';
	var len = 'QUEUE LENGTH'.yellow + eq;
	var qObj = '; QUEUE OBJECT'.yellow + eq;
	console.log(str, arrow, len, queue.length, qObj, queueObj);
}

var queue = [];
var queueObj = {};

setInterval(function() {
  queue.sort(function(a,b) {
  // console.warn('queue.length-->' , queue.length)
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
	var decide = queueObj[socket.getUserEmail()] ?
	socket.emit('player already in queue') :
	addToQueue(socket);
}

function addToQueue(socket) {
	queue.push(socket);
	queueObj[socket.getUserEmail()] = true;
	socket.emit('added to queue');
	logger('ADDED TO QUEUE');
}

function queueMatch() {
	while (queue.length >= 2) {
		var player1 = queue.pop();
		var player2 = queue.pop();

		delete queueObj[player1.getUserEmail()];
		delete queueObj[player2.getUserEmail()];
		logger('POPPED FROM QUEUE'.red);

		var profile = {p1: player1.getUserModel(), p2: player2.getUserModel()};
		console.log('PROFILE:'.green, profile);

		player1.delayEmit('profile', profile, 1000);
		player2.delayEmit('profile', profile, 1000);

		new Game(player1, player2).init();

		player1.delayEmit('match ready', 1000);
		player2.delayEmit('match ready', 1000);
	}
}

function removeFromQueue (socket) {
	queue.splice(queue.indexOf(socket.id), 1);
	delete queueObj[socket.getUserEmail()];
	// socket.disconnect();
	logger('REMOVED FROM QUEUE');
}

module.exports = {
	queueListeners: queueListeners,
	queueMatch: queueMatch,
	decideQueue: decideQueue,
	addToQueue: addToQueue,
	removeFromQueue: removeFromQueue
};
