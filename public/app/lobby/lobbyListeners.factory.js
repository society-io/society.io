(function() {

angular
  .module('app')
  .factory('lobbyListenersFactory', lobbyListenersFactory);

  lobbyListenersFactory.$inject = ['socketFactory', 'lobbyFactory','$state'];

  function lobbyListenersFactory(socketFactory, lobbyFactory, $state) {

    var socket = socketFactory;
    var lobby = lobbyFactory;

    return {
      init: init
    };

    // -----------------------
    // lobby listeners

    function init() {
      if (!socket.isConnected()) {
        console.error('socket is not connected. Can\'t set up lobby listeners');
        return;
      }

      socket.on('player already in queue', userAlreadyInQueue);
      socket.on('added to queue', addedToQueue);
      socket.on('join code invalid', joinCodeInvalid);
      socket.on('join code added', joinCodeAdded);
      socket.on('join code found', joinCodeFound);
      socket.on('join code not found', joinCodeNotFound);
      socket.on('you are', youAre);
    }

    function youAre(resp) {
      // event: 'you are'
      lobby.set('player', resp);
      lobby.set('avatar', resp.avatar);
    }

    function userAlreadyInQueue(resp) {
      // event: 'user already in queue'
      lobby.set('joinQueueErrorMessage', 'User already in queue.');
    }

    function addedToQueue() {
      // event: 'added to queue'
      lobby.set('whereTo', 'queue');
      lobby.set('waiting', true);
      $state.go('waiting');
    }

    function joinCodeInvalid(resp) {
      // event: 'join code invalid'
      lobby.set('joinCodeErrorMessage', resp.message);
    }

    function joinCodeAdded() {
      // event: 'join code added'
      lobby.set('whereTo', 'private');
      lobby.set('joinCode', lobby.get('tempJoinCode'));
      lobby.set('tempJoinCode', '');
      console.log('lobby whereTo = ', lobby.get('whereTo'));
      $state.go('waiting');
    }

    function joinCodeFound() {
      // event: 'join code found'
      lobby.set('whereTo', 'private');
      lobby.set('joinCode', lobby.get('tempJoinCode'));
      lobby.set('tempJoinCode', '');
      $state.go('waiting');
    }

    function joinCodeNotFound(resp) {
      // event: 'join code not found'
      lobby.set('joinCodeErrorMessage2', resp.message);
    }

  }

})();
