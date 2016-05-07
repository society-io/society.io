var onDisconnect = function(player) {
  // this = game instance
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

var onClientGameReady = function() {
  // this = player obj
  console.log('heard on client game ready');
  console.log(this.id);
  this.ready();
};

var onForfeit = function() {
  // this = player obj
  console.log('heard on forfeit! invoking player.forfeit()');
  this.forfeit();
};

module.exports = {
  onDisconnect: onDisconnect,
  onChoice: onChoice,
  onNoChoice: onNoChoice,
  onClientGameReady: onClientGameReady,
  onForfeit: onForfeit
};
