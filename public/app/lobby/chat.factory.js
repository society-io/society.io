angular
  .module('app')
  .factory('chatFactory', chatFactory);

  chatFactory.$inject = ['socketFactory', '$state'];

  function chatFactory(socketFactory, $state) {
    var socket = socketFactory;
    var lobby = lobbyFactory;

    var state = {
      userList: [],
      userLeft: null,
      messages: []
    };

    function chatListeners() {

      socket.on('updated user list', function(data) {
        state.userList = data.users;
        console.log('user list: ', data);
      });

      socket.on('message', function(data) {
        set('messages', data);
        console.log('messages: ', state.messages);
      });

      socket.on('user left ', function(data) {
        set('userLeft', data);
        console.log('message: ', message);
      });
    }

    function get(key) {
      return state[key];
    }

    function set(key, data) {
      if(Array.isArray(state[key])) {
        state[key].push(data);
      } else {
        state[key] = data;
        console.log('State: ',state);
      }
    }

    return {
      chatListeners: chatListeners,
      get: get,
      set: set
    };

  }
