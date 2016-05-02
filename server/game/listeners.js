var onDisconnect = function(player) {
  console.log(player + ' socket disconnected!');
  this.terminate('a player disconnected.');
};

var onChoice = function(player, data) {
  console.log('inside of onChoice ====== ');
  console.log('player = ', player);
  console.log('inside of onChoice. data.choice = ', data.choice);
  console.log('========================= ');
  this[player].updateChoice(data.choice);
};

var onNoChoice = function(player) {
  console.log('inside of onNoChoice =====');
  console.log('player = ', player);
  this[player].updateChoice('noChoice');
};

module.exports = {
  onDisconnect: onDisconnect,
  onChoice: onChoice,
  onNoChoice: onNoChoice
};
