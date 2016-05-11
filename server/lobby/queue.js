var Game = require('../game/game').Game;

var queue = [];

setInterval(function(){
	console.log("sorting the queue");
  queue.sort(function(a,b) {
    return a.getUserModel().mmr - b.getUserModel().mmr;
  });
  queueMatch();
  console.log('this is the queue array', queue);
}, 5000);

var queueListeners = function(socket) {

	socket.on('queue', function () {
		addToQueue(socket);
	});

	socket.on('remove from queue', function(){
		removeFromQueue(socket);
	});

	socket.on('disconnect', function(){
		disconnect(socket);
	});
};

function addToQueue(socket) {
	var user = socket.getUserModel();
	var isAlreadyQueued = false;

	queue.forEach(function(element) {
		var player = element.getUserModel();
		console.log('player inQueue: ',player);
		if (user.email === player.email) {
			isAlreadyQueued = true;
		}
	});

	if(isAlreadyQueued) {
		socket.emit('player already in queue', {
			message: 'Player Already In Queue',
			success: false
		});
	} else {
		queue.push(socket);
		socket.emit('added to queue');
	}

}


function queueMatch() {

	while (queue.length >= 2) {
		var player1= queue.pop();
		var player2= queue.pop();

		var profile = {};

		var p1 = player1.getUserModel();
		var p2 = player2.getUserModel();

		profile.player1 = p1;
		profile.player2 = p2;

		setTimeout(emitProfiles, 1000);

		var game= new Game(player1, player2);
		game.init();

		setTimeout(emitMatchReady, 1000);
	}

  function emitMatchReady() {
	  player1.emit('match ready');
	  player2.emit('match ready');
	}

	function emitProfiles() {
		player1.emit('profile', profile);
		player2.emit('profile', profile);
	}
}

function removeFromQueue(socket) {
	var index= queue.indexOf(socket.id);
	queue.splice(index, 1);

	console.log('Removed From Queue:', socket.id, ":",  queue.length );
	socket.disconnect();
}

function disconnect(socket) {
	socket.disconnect();
}

module.exports = {
	queueListeners: queueListeners,
	queueMatch: queueMatch,
	addToQueue: addToQueue,
	removeFromQueue: removeFromQueue,
	disconnect: disconnect
};