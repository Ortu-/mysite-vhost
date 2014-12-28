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
	$scope.form = {};
	$scope.comments = [];
	$scope.previews = [];
	$scope.previewPage = 0;
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
				
				$scope.form.post_id = data.post_id;
				
				$scope.getPostPreviews($scope.previewPage);
				$scope.getPostComments(data.post_id);
				$scope.getActiveUser();
				
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
				
				$scope.form.post_id = data.post_id;
				
				$scope.getPostPreviews($scope.previewPage);
				$scope.getPostComments(data.post_id);
				$scope.getActiveUser();
				
				$scope.isLoading = false;
			});
	}
	
	
	
	//get next post previews	
	$scope.getPostPreviews = function(reqPage){
		$http.get('/services/blog/preview-posts/'+ reqPage)
			.success(function(data){
				$scope.previews = data;
			});
	}
	
	
	
	//get post comments
	$scope.getPostComments = function(reqPost){
		$http.get('/services/blog/post-comments/' + reqPost)
			.success(function(data){
				$scope.comments = data;
				
				//TODO: get user details for each comment (avatar, contact etc) -> do it in the comments get req, and return the 'join'?
			});
	}
	
	
	
	//get user data
	$scope.getUserDetails = function(reqUser){

	}
	
	
	
	$scope.getActiveUser = function(){
		//TEMP:
		$scope.form.user = "JoshKirklin";	
	}


	
	//post new comment
	$scope.addComment = function(){
		
		if(!$scope.form.rbt || $scope.form.rbc){
			alert("If you are a real human, check only the box 'run by thought'.\r\n\r\nDon't want to mess with this? Register or Sign In!");
		}
		else if(!$scope.form.content){
			alert("Hey! Your comment is blank!");
		}
		else{
			
			var tDate = new Date();
			$scope.form.date = tDate.getFullYear() + "-" + (tDate.getMonth() + 1) + "-" + tDate.getDate();
			
			$http.post('/services/blog/post-add-comment/', $scope.form)
				.success(function(data){
					//push to comments and clear the form.
					
				});
		}
	}

});

appControllers.controller('downloadsCtrl', function($scope, $routeParams){
	
});