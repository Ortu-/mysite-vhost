var appControllers = angular.module('appControllers', []);

appControllers.controller('homeCtrl', function($scope, $routeParams){
	
});

appControllers.controller('loginCtrl', function($scope, userSession, $http, $routeParams){
	
});

appControllers.controller('searchCtrl', function($scope, $routeParams){
	
});

appControllers.controller('blogCtrl', function($scope, userSession, $http, $sce, $timeout, $routeParams){
	
	window.scrollTo(0, 0);
	$scope.isLoading = true;	
	
	$scope.menu = {active: false};
	$scope.post = {};
	$scope.form = {};
	$scope.pushComment = {};
	$scope.comments = [];
	$scope.previews = [];
	$scope.previewPage = 0;
	$scope.readingList = [];
	
	//get post content
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
			});
	}

	
	
	//get user data
	$scope.getActiveUser = function(){
		
		if(userSession.isLoggedIn){
		
			$scope.form.avatar = "avatar_" + $scope.form.user + ".jpg";
			
		}
		else{
		
			//check localstorage for a previous guest, else create a new guest
			if(false){
			
			}
			else{
				userSession.name = "Guest" + Math.floor((Math.random() * 10000) + 1);
			}

			$scope.form.avatar = "avatar_guest.jpg";
		}
		
		$scope.form.user = userSession.name;
		
	}


	
	//post new comment
	$scope.addComment = function(){
		
		if(!$scope.form.rbt || $scope.form.rbc){
			alert("If you are a real human, check the appropriate box.\r\n\r\nDon't want to mess with this? Register or Sign In!");
		}
		else if(!$scope.form.content){
			alert("Hey! Your comment is blank!");
		}
		else{
			
			var tDate = new Date();
			$scope.form.date = tDate.getFullYear() + "-" + (tDate.getMonth() + 1) + "-" + tDate.getDate();
			
			$http.post('/services/blog/post-add-comment/', $scope.form)
				.success(function(data){
					angular.copy($scope.form, $scope.pushComment);
					$scope.comments.push($scope.pushComment);
					$scope.form.content = "";
				});
		}
	}
	
	
	
	//menu controls


});

appControllers.controller('downloadsCtrl', function($scope, $routeParams){
	
});