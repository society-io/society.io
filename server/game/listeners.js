var onDisconnect = function(player) {
  // this = game instance
  console.log(player + ' socket disconnected!');
  console.log('inside onDisconnect. args[1] = ', arguments[1]);
  this.terminate('a player disconnected.');
};

var onChoice = function(data) {
  // this = player obj
  this.updateChoice(data.choice);
};

var onNoChoice = function() {
  // this = player obj
  this.updateChoice('noChoice');
  console.log('NO CHOICE');
};

var onClientGameReady = function() {
  // this = player obj
  console.log('onClientGameReady Listener');
  console.log('GAME: ID', this.id);
  this.ready();
};

var onForfeit = function() {
  // this = player obj
  console.log('onForfeit Listener');
  this.forfeit();
};

module.exports = {
  onDisconnect: onDisconnect,
  onChoice: onChoice,
  onNoChoice: onNoChoice,
  onClientGameReady: onClientGameReady,
  onForfeit: onForfeit
};
