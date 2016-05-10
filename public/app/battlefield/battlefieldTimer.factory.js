angular
  .module('app')
  .factory('battlefieldTimerFactory', bfTimerFactoryFunction);

bfLogicFactoryFunction.$inject = ['$rootScope', '$interval'];

function bfTimerFactoryFunction($rootScope, $interval) {

  var time = 10;
  var tick;

  return {
    getTime: getTime,
    resetTimer: resetTimer,
    startTimer: startTimer,
    stopTimer: stopTimer
  };

  function getTime() {
    return time;
  }

  function resetTimer() {
    time = 10;
  }

  function startTimer() {
    // start the timer and resolve promise upon finishing
    return new Promise(function(resolve, reject) {
      if (angular.isDefined(tick)) {
        reject();
      } else {
        tick = $interval(function() {
          if (time > 0) {
            time--;
          } else {
            resolve();
            stopTimer();
          }
        }, 1000);
      }
    });
  }

  function stopTimer() {
    if (angular.isDefined(tick)) {
      $interval.cancel(tick);
      tick = undefined;
    }
  }
}