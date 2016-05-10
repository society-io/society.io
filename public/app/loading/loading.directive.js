(function(){


angular
  .module('app')
  .directive('stateLoadingIndicator', stateLoadingIndicator);

  stateLoadingIndicator.$inject = ['socketFactory', '$rootScope', '$state'];

  function stateLoadingIndicator(socketFactory, $rootScope, $state) {
    return {
      restrict: 'E',
      template: "<div ng-show='isStateLoading' class='loading-indicator'>" +
      "<div class='loading-indicator-body'>" +
      "<h3 class='loading-title'>Loading...</h3>" +
      "<div class='spinner'><chasing-dots-spinner></chasing-dots-spinner></div>" +
      "</div>" +
      "</div>",
      replace: true,
      link: function(scope, elem, attrs) {
        var on = socketFactory.on;
        scope.isStateLoading = true;
      }
    };
  }

})();