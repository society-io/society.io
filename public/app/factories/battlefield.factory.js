angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http', 'socketFactory']; //injections go inside brackets

function bfFactoryFunction($http, socketFactory) {
  //flags at top and then factory, then function declarations
  var emit = socketFactory.emit;
  var on = socketFactory.on;
  var getterObj = {choices: ['rich', 'bum', 'tax', 'cop', 'jail']};

  var factory = {
    emit: emit,
    setChoice: setChoice,
    getter: getter
  };

  on('gameReady', function(resp) {
    console.log('Game ready: ', resp);
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