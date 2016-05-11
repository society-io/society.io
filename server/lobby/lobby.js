var existingUser = require('../db/userModel.js');

var lobbyListeners = function(socket) {
	socket.on('who am i', function() {
		socket.emit('you are', socket.user._doc);
	});

  socket.on('update avatar', function(data) {
    existingUser.findOneAndUpdate({email: data.email},
      {$set: {avatar: data.avatar}},
      function(err, success){
        if(err) {
          socket.emit('avatar not updated', {
            message: 'Could Not Update Avatar!',
            success: false
          });
        }
        socket.emit('avatar updated', {
          message: 'Successfully Updated Avatar!',
          success: true
        });
    });
  });

};

module.exports = {
	lobbyListeners: lobbyListeners
};