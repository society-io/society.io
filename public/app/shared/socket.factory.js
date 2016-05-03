angular
  .module('app')
  .factory('socketFactory', socketFactory);

	socketFactory.$inject = ['$rootScope'];

	function socketFactory($rootScope) {

		return {
		  connectSocket:connectSocket,
		  on: on,
		  emit: emit
		};

	  function connectSocket() {
	    io.connect();
	    console.log('connected');
		}

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
