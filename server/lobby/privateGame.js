var colors = require('colors');
var Game = require('../game/game').Game;
// var activeSockets = require('../common').activeSockets;
var privateGames = {}; // { joinCode: [{sock1}, {sock2}] }
var sockId_joinCode = {}; // { socketId: joinCode }

// console.log privateGames object
function log_PG(string) {
	string = string || '';
	var arrow = '-->';
	var privateGames_string = 'privateGames'.yellow + arrow;
	console.log(string, privateGames_string, privateGames);
}

// console.log sockId_joinCode object
function log_sockId_JC(string) {
	string = string || '';
	var arrow = '-->';
	var socketId_joinCode_string = 'sockId_joinCode'.cyan;
	console.log(string, socketId_joinCode_string, sockId_joinCode);
}

function privateGameListeners(socket) {

  socket.on('create private game', function(data) {
    storeJoinCode(socket, data);
  });

  socket.on('join private game', function(data){
    storePlayer2(socket, data);
  });

  socket.on('initialize battlefield', function(data){
    initiatePrivateGame(data);
  });

  socket.on('cancel private game', function(data){
    cancelPrivateGame(socket, data);
  });

	socket.on('disconnect', function() {
 	  cancelPrivateGame(socket);
 	  });
}

function storeJoinCode(socket, data) {
	if(!privateGames[data.joinCode]) {

	  privateGames[data.joinCode] = [];
		log_PG();

		sockId_joinCode[socket.socketId] = data.joinCode;
		log_sockId_JC();

	  storePlayer1(socket, data);

	} else {
		socket.emit('join code invalid', {message: 'join code invalid!'});
  }
}

function storePlayer1(socket, data) {
	privateGames[data.joinCode][0] = socket;
	log_PG();
	socket.emit('join code added');
}

function storePlayer2(socket, data) {
	if(privateGames[data.joinCode] && !privateGames[data.joinCode][1]) {

		privateGames[data.joinCode][1] = socket;
		sockId_joinCode[socket.socketId] = data.joinCode;
		log_PG('PLAYER 2 STORED to ');
		log_sockId_JC();

		socket.emit('join code found');

		setTimeout(function(){
      socket.emit('join code to initialize battlefield', {joinCode: data.joinCode});
    }, 3000);
    
	} else {
	socket.emit('join code not found', {message: 'join code not found'});
	}
}

function initiatePrivateGame(data) {
  var players = privateGames[data.joinCode];

	var player1 = players[0];
	var player2 = players[1];
	console.log('PLAYER1 '.green, player1);

	console.log('PLAYER2 '.magenta, player2);

	var profile = {};

	profile.p1 = player1.getUserModel();
	profile.p2 =player2.getUserModel();

	player1.delayEmit('profile', profile, 1000);
	player2.delayEmit('profile', profile, 1000);

	console.log('PROFILE'.red, profile);

	new Game(player1, player2).init();

	console.log('NEW GAME PRIVATE GAME INSTANTIATED'.bgBlue);

	player1.emit('match ready');
	player2.emit('match ready');
}

function cancelPrivateGame (socket) {
	var joinCode = sockId_joinCode[socket.socketId];

	log_PG('BEFORE DELETE');
	log_sockId_JC();

  delete sockId_joinCode[socket.socketId];
  delete privateGames[joinCode];

	log_PG('AFTER DELETE');
	log_sockId_JC();
}


module.exports = {
  privateGameListeners: privateGameListeners
};
