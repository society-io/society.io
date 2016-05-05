var onDisconnect = function(player) {
  // this is bound to the game instance
  console.log(player + ' socket disconnected!');
  this.terminate('a player disconnected.');
};

var onChoice = function(data) {
  // this = player obj
  this.updateChoice(data.choice);
};

var onNoChoice = function() {
  // this = player obj
  this.updateChoice('noChoice');
};

var onClientGameReady = function(player) {
  // this = player obj
  this[player].gameReady = true;
  if (this.player1.gameReady && this.player2.gameReady) {
    this.newRound();
  }
};

module.exports = {
  onDisconnect: onDisconnect,
  onChoice: onChoice,
  onNoChoice: onNoChoice,
  onClientGameReady: onClientGameReady
};
