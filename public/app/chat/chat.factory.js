angular
  .module('app')
  .factory('chatFactory', chatFactory);

  chatFactory.$inject = ['socketFactory', '$state'];

  function chatFactory(socketFactory, $state) {
    var socket = socketFactory;
    var lobby = lobbyFactory;

    var userJoined,
      userList,
      message,
      userLeft;

    socket.on('user joined', function (data) {
      userJoined = data;
      console.log('user joined: ', data);
    });

    socket.on('updated user list', function (data) {
      userList = data;
      console.log('user list: ', data);
    });

    socket.on('message: ', function (data) {
      message = data;
      console.log('message:', message);
    });

    socket.on('user left ', function (data) {
      userLeft = data;
      console.log('message:', message);
    });
    return {
      getUser: function () {
        return userJoined;
      },

      getUserList: function () {
        return userList;
      },

      getUserLeft: function () {
        var temp = userLeft;
        userLeft = null;
        return temp;
      },

      getLastMsg: function () {
        return lastMessage;
      },
    };

  }

    // Date.prototype.time = function (obj) {
    //   var that = this;
    //   var date = {};
    //   date.day = that.getDate().toString();
    //   date.month = that.toLocaleString('en-us', {month: 'short'});
    //   date.time = that.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    //   if (obj === undefined) {
    //     return date.time.toLocaleLowerCase() + ' -- ' + date.month + ' ' + date.day;
    //   }
    //   return date;
    // };