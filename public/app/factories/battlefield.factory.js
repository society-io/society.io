angular
  .module('app')
  .factory('battlefieldFactory', bfFactoryFunction);

bfFactoryFunction.$inject = ['$http', 'socketFactory']; //injections go inside brackets

function bfFactoryFunction($http, socketFactory) {
  //flags at top and then factory, then function declarations
  var factoryChoice = []; //reset to choice upon function call
  var emit = socketFactory.emit;
  var on = socketFactory.on;
  var getterObj = {choices: ['Rich', 'Bum', 'Tax', 'Cop', 'Jail']};

  var factory = {
    emit: emit,
    setChoice: setChoice,
    getter: getter
  };

  on('gameReady', function(resp){
    console.log('Game ready: ', resp);
  });

  return factory;

  function setChoice(userChoice){
    factoryChoice = userChoice;
    emit('choices', {choice: factoryChoice});
    console.log('this is the factoryChoice: ', factoryChoice);
  }

  function getter(name){
    return getterObj[name];
  }

}