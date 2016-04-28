angular.module('myApp', ['btford.socket-io'])
.controller('rockCtrl', function($scope, rockSocket){
  $scope.rock= [];
  rockSocket.on('rock', function(data){
      console.log(data);
    $scope.submitRock = function() {
      $scope.rock.push(data.message);
    }
  })
})
.controller('paperCtrl', function($scope, paperSocket){
  $scope.paper= [];
  paperSocket.on('paper', function(data){
      console.log(data);
    $scope.submitPaper = function() {
      $scope.paper.push(data.message);
    }
  })
})
.controller('scissorsCtrl', function($scope, scissorsSocket){
  $scope.scissors= [];
  scissorsSocket.on('scissors', function(data){
      console.log(data);
    $scope.submitScissors = function() {
      $scope.scissors.push(data.message);
    }
  })
})
.factory('rockSocket', ['socketFactory', function(socketFactory){
  return socketFactory();
}])
.factory('paperSocket', ['socketFactory', function(socketFactory){
  return socketFactory();
}])
.factory('scissorsSocket', ['socketFactory', function(socketFactory){
  return socketFactory();
}])