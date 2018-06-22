'use strict';
angular.module('myApp').controller('homeController', (function($scope, $http, cfpLoadingBar) {
	console.log(cfpLoadingBar)
	
	$scope.onSearch = function(search) {
    console.log(search)
  };

  $scope.loadMore = function() {
  	console.log('loadMore')
  	console.log('load ../api/CONTENTLISTINGPAGE-PAGE'+$scope.scrollLoadIdx+'.json')
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
	  }).catch(function onError(response) {
	   console.log(response);
	  }).finally(function() {
      cfpLoadingBar.complete();
    });
  };

  $scope.init = function() {
		$scope.scrollLoadIdx = 1
		$scope.items = []
		$scope.loadMore()
	};

	$scope.init()

}));

angular.module('myApp')  
.directive('whenScrolled', function($window, $timeout, $http) {
  return {
    restrict: "A",
    link: function(scope, element, attr) {
    	//console.log(scope.$parent)
      var top = angular.element($window)[0].screenTop;
      var origHeight = angular.element($window)[0].screen.height;
      var height = (origHeight * 0.9);

      // bind the digest cycle to be triggered by the scroll event
      // when it exceeds a threshold
      angular.element($window).bind('scroll', function(event) {
        if (angular.element($window)[0].scrollY >= (height - 360)) {

          // show the spinner when triggered
          //scope.spinner.hide = !scope.spinner.hide;

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