(function (){
  angular
    .module('app')
    .factory('loadingFactory', loadingFactory);
    
    loadingFactory.$inject = ['$state','socketFactory'];
    
    function loadingFactory($state, socketFactory) {
    	var emit = socketFactory.emit;
		  var on = socketFactory.on;

    	listeners();
    	return {};

		  function listeners() {

				on('matchReady',function(){
					$state.go('/battlefield');
				});

				on('privateGameInitiated', function() {
					$state.go('/battlefield');
				});

			}	
    }


})();