var Game = require('../game/game').Game;

var queue = [];

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
	queue.push(socket);
	socket.emit('added to queue');
	console.log('Added To Queue: ',queue);
	queueMatch(socket);
}

function queueMatch(socket) {

  setInterval(function(){
    queue.sort(function(a,b) {
      return a.mmr - b.mmr;
    });
  }, 5000);

	if (queue.length>=2) {
		var player1= queue.pop();
		var player2= queue.pop();

		var profile = {};

		var p1 = player1.getUserModel();
		var p2 = player2.getUserModel();

		profile.player1 = p1;
		profile.player2 = p2;

		setTimeout(function(){
			player1.emit('profile', profile);
			player2.emit('profile', profile);
		}, 1000);

		console.log('PLAYER PROFILES: ',profile);

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

function removeFromQueue(socket) {
	var index= queue.indexOf(socket.id);
	queue.splice(index, 1);
	console.log('Removed From Queue:',queue);
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


