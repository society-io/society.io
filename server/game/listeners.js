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

module.exports = {
  onDisconnect: onDisconnect,
  onChoice: onChoice
};
