'use strict';
angular.module('myApp').controller('homeController', (function($scope, $http, cfpLoadingBar) {

  /*
  * Search implemented based on local data
  * do not fire API calls
  */  
	$scope.onSearch = function(search) {
    /*
    * Data copied for the local search
    */
    var _lastLoadedItems = angular.copy($scope.lastLoadedItems);
    if(search) {
      $scope.data.page['content-items'].content = []
      for(var i = 0; i < _lastLoadedItems.length; i++) {
        var item = _lastLoadedItems[i]
        if(item.name.indexOf($scope.search) > -1) {
          $scope.data.page['content-items'].content.push(item)
        }
      }
    } else {
      $scope.data.page['content-items'].content = _lastLoadedItems
    }
  };

  /*
  * Fetch data from JSON
  */
  $scope.loadMore = function() {
  	console.log('loadMore')
    cfpLoadingBar.start();
    $http.get('../api/CONTENTLISTINGPAGE-PAGE'+$scope.scrollLoadIdx+++'.json')
	  .then(function onSuccess(response) {
	  	if(!$scope.data) {
	  		$scope.data = response.data	
	  	} else {
	  		for(var i = 0; i < response.data.page['content-items'].content.length; i++) {
	  			var item = response.data.page['content-items'].content[i]
	  			$scope.data.page['content-items'].content.push(item)
	  		}
	  	}
      /*
      * Data copied for the local search
      */  
      $scope.lastLoadedItems = $scope.data.page['content-items'].content
	  }).catch(function onError(response) {
	   console.log(response);
	  }).finally(function() {
      cfpLoadingBar.complete();
    });
  };

  /*
  * Init function to load default data
  */
  $scope.init = function() {
		$scope.scrollLoadIdx = 1
		$scope.loadMore()
	};

	$scope.init()

}));

/*
* directive - for handling scroll event
*/
angular.module('myApp')  
.directive('whenScrolled', function($window, $timeout, $http) {
  return {
    restrict: "A",
    link: function(scope, element, attr) {
      var top = angular.element($window)[0].screenTop;
      var origHeight = angular.element($window)[0].screen.height;
      var height = (origHeight * 0.9);

      // bind the digest cycle to be triggered by the scroll event
      // when it exceeds a threshold
      angular.element($window).bind('scroll', function(event) {
        if (angular.element($window)[0].scrollY >= (height - 360)) {

          angular.element($window)[0].requestAnimationFrame(function(){
            // invoke the function passed into the 'whenScrolled' attribute
            scope.$apply(attr.whenScrolled);

            // increment the threshold
            height += (origHeight * 1.5);
          })
        }
      });
    }
  }
})