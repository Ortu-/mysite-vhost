var appControllers = angular.module('appControllers', []);

appControllers.controller('homeCtrl', function($scope, $routeParams){
	
});

appControllers.controller('searchCtrl', function($scope, $routeParams){
	
});

appControllers.controller('blogCtrl', function($scope, $http, $sce, $timeout, $routeParams){
	
	//get post content
	window.scrollTo(0, 0);
	$scope.isLoading = true;	
	
	$scope.post = {};
	$scope.previews = [];
	$scope.previewPage = -1;
	$scope.readingList = [];
	
	if(!$routeParams.reqPost){
	
		//get next unread post
		
		//TODO: html5 localstorage
		//TEMP: redirect to first post
		$http.get('/services/blog/post-content/introduction')
			.success(function(data){
				$scope.post.content = $sce.trustAsHtml(data.contentBody);
				$scope.post.title = data.title;
				$scope.post.date = data.date;
				$scope.post.tags = data.tags;
				if($scope.previewPage = -1){
				
				}
				$scope.getPostPreviews(0);
				$scope.isLoading = false;
			});
		//END TEMP
	}
	else{
	
		//get requested post
		$http.get('/services/blog/post-content/' + $routeParams.reqPost)
			.success(function(data){
				$scope.post.content = $sce.trustAsHtml(data.contentBody);
				$scope.post.title = data.title;
				$scope.post.date = data.date;
				$scope.post.tags = data.tags;
				$scope.getPostPreviews(0);
				$scope.isLoading = false;
			});
	}
	
	//get post comments
	
	//TEMP:
	$scope.comments = [
		{'user': 'Guest123',
		 'content': 'yay'},
		{'user': 'Guest456',
		 'content': 'more?'},
		{'user': 'Guest123',
		 'content': 'yes yes'}		 
	];
	
	
	
	//get next post previews	
	$scope.getPostPreviews = function(reqPage){
		$http.get('/services/blog/preview-posts/'+ reqPage)
			.success(function(data){
				$scope.previews = data;
			});
	}

});

appControllers.controller('downloadsCtrl', function($scope, $routeParams){
	
});