angular
  .module('app')
  .factory('socketFactory', socketFactory);

  socketFactory.$inject = ['$rootScope', 'authFactory'];

  function socketFactory($rootScope, authFactory) {

    var socket;

    return {
      disconnect: disconnect,
      connectSocket: connectSocket,
      on: on,
      emit: emit,
      isConnected: isConnected
    };

    function isConnected() {
      console.log('socket connection = ', !!socket);
      return !!socket;
    }

    function disconnect() {
      if (isConnected()) {
        console.log('calling disconnect');
        socket.disconnect();
        socket = null;
      }
    }

    function connectSocket() {
      return new Promise(function(resolve, reject) {
        if (!socket && authFactory.isAuthed()) {
          console.log('connecting socket');
          socket = io.connect();
          socket.on('socket initialized', function() {
            console.log('socket initialized heard. Resolving!');
            resolve();
          });
          socket.emit('init', authFactory.attachToken({}));
        }
      });
    }

    /**
     *  Socket Events
     *
     *  Used to wrap the socket's native 'on' and 'emit' functions
     *  packet envelope that we specify
     */
    function on(eventName, callback) {
      console.log('on was called. inside socket factory, eventName = ', eventName);
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    }

    function emit(eventName, data, callback, auth) {
      if (auth) {
        data = data || {};
        data = authFactory.attachToken(data);
      }
      console.log('emit was called. inside socket facotry, eventName = ', eventName);
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
