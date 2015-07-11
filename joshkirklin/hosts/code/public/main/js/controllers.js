
/* CONTROLLERS =========================================================*/

var appControllers = angular.module('appControllers', []);

appControllers.controller('homeCtrl', function($scope, $routeParams, homeServiceGroup){
	$scope.headerTitle = $routeParams.headerTitle || "";
});

appControllers.controller('blogSearchCtrl', function($scope, $routeParams, blogServiceGroup){
	$scope.headerTitle = $routeParams.headerTitle || "";
});

appControllers.controller('blogCtrl', function($scope, $routeParams, $sce, requestService, blogServiceGroup){
	$scope.headerTitle = $routeParams.headerTitle || "";
	
	window.scrollTo(0,0);
	$scope.isLoading = true;
	
	//private data
	var _blogService = blogServiceGroup.blog;
	var _previewPage = 0;
	
	//public data	
	$scope.session = blogServiceGroup.session;
	$scope.post = {};
	$scope.form = {};
	$scope.pushComment = {};
	$scope.comments = [];
	$scope.previews = [];
	$scope.readingList = [];
	
	// init -------------------------------------------------------------------------------
	
	var init = function(){
	
		_setActiveUser();
		
		//get post content
		var reqPost = "";
		if(!$routeParams.reqPost){
			//TEMP: default to first post
			//TODO: get last read from localstorage and then query next unread post
			reqPost = "introduction";
		}
		else{
			reqPost = $routeParams.reqPost;
		}
		
		_getPostPreviews(_previewPage);
		_getPost(reqPost);
			
	}
	
	// blog data ---------------------------------------------------------------------------
	
	var _getPost = function(reqPost){
		$scope.isLoading = true;
		requestService.get('/api/blog/get/post-content/'+ reqPost, true)
			.then(function(resData){
				$scope.post = resData;
				$scope.post.content = $sce.trustAsHtml(resData.content);
				$scope.form.post_id = resData.post_id;
				$scope.isLoading = false;
				_getPostComments(resData.post_id);
			})
			.catch(function(err){
				$scope.post.content = "Oops! Could not get the post, sorry.";
				$scope.isLoading = false;
			});
	}
	
	var _getPostComments = function(reqPostID){
		requestService.get('/api/blog/get/post-comments/'+ reqPostID, false)
			.then(function(resData){
				$scope.comments = resData;
			});
	}	
	
	var _getPostPreviews = function(reqPage){
		requestService.get('/api/blog/get/post-previews/'+ reqPage, true)
			.then(function(resData){
				$scope.previews = resData;
			});		
	}
	
	// blog actions ------------------------------------------------------------
	
	$scope.addComment = function(){
		
		if(!$scope.post.post_id){
			alert("Sorry, you can't comment on an invalid post");
		}
		else if(!$scope.form.rbt || $scope.form.rbc){
			alert("If you are a real human, check the appropriate box.\r\n\r\nDon't want to mess with this? Register or Sign In!");
		}
		else if(!$scope.form.content){
			alert("Hey! Your comment is blank!");
		}
		else{
			requestService.post('/api/blog/post/add-comment/', $scope.form)
				.then(function(resData){
					if(resData.rtn){
						$scope.form.date = resData.rtn
						angular.copy($scope.form, $scope.pushComment);
						$scope.comments.push($scope.pushComment);
						$scope.form.content = "";
					}
				});
		}
	}	
	
	// user data -----------------------------------------------------------------
	
	var _setActiveUser = function(){
		$scope.form.user = $scope.session.user.name;
		if($scope.session.isLoggedIn){
			$scope.form.avatar = "avatar_" + $scope.session.user.name + ".jpg";
		}
		else{
			$scope.form.avatar = "avatar_guest.jpg";
		}
	}
	
	init();
	
});

appControllers.controller('portfolioCtrl', function($scope, userSession, $sce, $http, $routeParams){
	$scope.headerTitle = $routeParams.headerTitle || "";
	
	$scope.previews = [];
	
	var onPort = ":8080";
	
	//get demo content
	if(!$routeParams.reqDemo){
		//display demo index list
		$scope.previews.push({
			name: "Dynamix",
			link: "http://demo.joshkirklin.com" + onPort + "/dynamix",
			display: "/portfolio/dynamix/preview-banner.jpg",
			description: "An application for placing custom orders; designed to client specifications. It allows eCommerce shoppers to build and preview customized engagement rings by selecting from an assortment of settings and styles."
		});
	}
	else{
		//load specified demo into iframe ?
		//for now, just load fully into demo host.
	}
	
});
