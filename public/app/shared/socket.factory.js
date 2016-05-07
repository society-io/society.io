angular
  .module('app')
  .factory('socketFactory', socketFactory);

	socketFactory.$inject = ['$rootScope', 'authFactory'];

	function socketFactory($rootScope, authFactory) {

		var socket;

		return {
		  connectSocket:connectSocket,
		  on: on,
		  emit: emit
		};

	  function connectSocket() {
	    socket = io.connect();
	    socket.emit('init', authFactory.attachToken({}));
		}

		/**
		 *	Socket Events
		 *
		 *	Used to wrap the socket's native 'on' and 'emit' functions
		 *	packet envelope that we specify
		 */
	  function on(eventName, callback) {
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
