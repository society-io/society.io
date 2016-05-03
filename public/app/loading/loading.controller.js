(function(){


angular
  .module('app')
  .controller('LoadingController', LoadingController);

  LoadingController.$inject = ['loadingFactory'];

  function LoadingController(loadingFactory) {
    
  }

})();