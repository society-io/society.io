var choice = function(socket, player) {

  socket.on('choice', function(data) {
    console.log('player ' + player.id + ' submitted a choice.');
    player.updateChoice(data.choice);
  });
};
