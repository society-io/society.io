angular
  .module('app')
  .factory('socketFactory', socketFactory);

socketFactory.$inject = ['$rootScope'];

function socketFactory($rootScope) {
  var socket = io.connect();
  
  var factory = {
    on: on, 
    emit: emit
  };

  return factory;

  function on(eventName, callback) {
    socket.on(eventName, function() {
      var args = arguments;
      $rootScope.$apply(function() {
        callback.apply(socket, args);
      });
    });
  }

  function emit(eventName, data, callback) {
    socket.emit(eventName, data, function() {
      var args = arguments;
      $rootScope.$apply(function() {
        if(callback) {
          callback.apply(socket, args);
        }
      });
    });
  }
}

// CLIENT-SERVER SOCKET EVENTS
// LISTEN FOR 'socket on'
// two players have entered the queue and have been matched
    // Socket.on('gameReady')
// Results of players choices have been received and evaluated
    // Socket.on('gameResult', {message: this.winner})
// EMIT TO SERVER 'socket.emit'
// emit events when player1 and player2 submit there choices
    // Socket.emit('choices', {player1Choice: 'rich'})
    // Socket.emit('choices', {player2Choice: 'jail'})
// OPTIONS
// format as lowercase strings 
    // ['rich', 'bum', 'tax', 'cop', 'jail']
// SOCKET FACTORY
// create socket factory service to be accessed by all controllers involving game