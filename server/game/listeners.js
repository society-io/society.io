var onDisconnect = function(player) {
  // this is bound to the game instance
  console.log(player + ' socket disconnected!');
  this.terminate('a player disconnected.');
};

var onChoice = function(data) {
  // this = player obj
  console.log('inside of onChoice ====== ');
  console.log('inside of onChoice. data.choice = ', data.choice);
  console.log('========================= ');
  this.updateChoice(data.choice);
};

var onNoChoice = function() {
  // this = player obj
  console.log('inside of onNoChoice =====');
  console.log('player = ', player);
  this.updateChoice('noChoice');
};

var onClientGameReady = function(player) {
  console.log('inside of onClientGameReady');
  // this = player obj
  this[player].gameReady = true;
  if (this.player1.gameReady && this.player2.gameReady) {
    console.log('emitting newRound');
    this.newRound();
  }
};

module.exports = {
  onDisconnect: onDisconnect,
  onChoice: onChoice,
  onNoChoice: onNoChoice,
  onClientGameReady: onClientGameReady
};
