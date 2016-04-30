angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http', 'socketFactory']; //injections go inside brackets

function bfFactoryFunction($http, socketFactory) {
  //flags at top and then factory, then function declarations
  var emit = socketFactory.emit;
  var on = socketFactory.on;

  var getterObj = {
    choices: ['rich', 'bum', 'tax', 'cop', 'jail'],
    results: false,
    playerId: false,
    opponentId: false
  };


  var factory = {
    emit: emit,
    setChoice: setChoice,
    getter: getter
  };

  on('gameReady', function(resp) {
    console.log('Game ready: ', resp);
    getterObj.playerId = resp.playerId;
    console.log('okay', getterObj.playerId);
    if(resp.playerId === 1){
      console.log( 'inside if');
      getterObj.opponentId = 2;
    } else {
      getterObj.opponentId = 1;
      console.log('inside else');
    }
    console.log('this is opponentId', getterObj.opponentId);
  });

  on('roundResult', function(resp){
      console.log("this is the round result",resp);

      getterObj.results = resp;

  });

  on('roundResult', function(resp){
      console.log("this is resp inside getWinner()",resp);
  });

  return factory;

  function setChoice(userChoice) {
    emit('choice', {choice: userChoice});
    console.log('this is the factoryChoice: ', userChoice);
  }

  function getter(name) {
    return getterObj[name];
  }



  


}