
var mainApp = angular.module('mainApp', [
	'ngRoute',
	'ngResource',
	'appControllers',
	'appServices'
]);

mainApp.config(function($locationProvider, $routeProvider){
	
	var _theme = "default";
	
	$routeProvider
	
		.when('/', { templateUrl: 'main/partials/page-home.html', 
			controller: 'homeCtrl',
			title: 'Code | Josh Kirklin',
			resolve: {
				setStaticParams: function($route){ 
					$route.current.params.headerTitle = "";
				}
			}})
			
		.when('/about', { templateUrl: 'main/partials/page-about.html', 
			controller: 'homeCtrl',
			title: 'Code | Josh Kirklin',
			resolve: {
				setStaticParams: function($route){ 
					$route.current.params.headerTitle = "return self.about();";
				}
			}})
			
		.when('/blog/search', { templateUrl: 'blog/partials/page-search.html', 
			controller: 'blogSearchCtrl',
			title: 'Blog Search | Josh Kirklin',
			resolve: {
				setStaticParams: function($route){ 
					$route.current.params.headerTitle = "new code.blog(this);";
				}
			}})			
			.when('/blog/search/:reqTag', { templateUrl: 'blog/partials/page-search.html', 
				controller: 'blogSearchCtrl',
				title: 'Blog Search | Josh Kirklin',
				resolve: {
					setStaticParams: function($route){ 
						$route.current.params.headerTitle = "new code.blog(this);";
					}
				}})		
			
		.when('/blog', { templateUrl: 'blog/partials/page-blog.html', 
			controller: 'blogCtrl', 
			title: 'Code Blog | Josh Kirklin',
			styleSheet: '/blog/skin/'+ _theme +'/stylesheets/style.css',
			resolve: {
				setStaticParams: function($route){ 
					$route.current.params.headerTitle = "new code.blog(this);";
				}
			}})				
			.when('/blog/:reqPost', { templateUrl: 'blog/partials/page-blog.html', 
				controller: 'blogCtrl', 
				title: 'Code Blog | Josh Kirklin',
				styleSheet: '/blog/skin/'+ _theme +'/stylesheets/style.css',
				resolve: {
					setStaticParams: function($route){ 
						$route.current.params.headerTitle = "new code.blog(this);";
					}
				}})	

		.when('/downloads', { templateUrl: '',
			controller: 'downloadsCtrl',
			title: 'Downloads | Josh Kirklin' })
			
		.when('/portfolio', { templateUrl: 'portfolio/partials/page-portfolio.html',
			controller: 'portfolioCtrl',
			title: 'Portfolio | Josh Kirklin' })				

		.when('/user/login', { templateUrl: '', 
			controller: 'loginCtrl',
			title: 'User Login | Josh Kirklin' })
			
		.when('/user/profile/:reqUser', { templateUrl: '', 
			controller: 'profileCtrl',
			title: 'User Profile' })
			
		.otherwise({ redirectTo:'/'});
		
	$locationProvider.html5Mode(true);
	
});

mainApp.run(['$location', '$rootScope', function($location, $rootScope) {
    
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.hasOwnProperty('$$route')) {
            $rootScope.title = current.$$route.title;
						$rootScope.styleSheet = current.$$route.styleSheet;
        }
    });
	
}]);