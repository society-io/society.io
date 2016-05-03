(function(){


angular
  .module('app')
  .controller('LoadingController', LoadingController);

  LoadingController.$inject = ['preGameFactory'];

  function LoadingController(preGameFactory) {

  }

})();