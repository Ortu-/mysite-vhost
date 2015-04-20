var codeApp = angular.module('codeApp', [
	'ngRoute',
	'ngResource',
	'appControllers',
	'appSession'
]);

codeApp.config(function($locationProvider, $routeProvider){

	$routeProvider
	
		.when('/', { templateUrl: '/partials/home/page', 
			controller: 'homeCtrl', 
			title: 'Code | Josh Kirklin' })
		.when('/about', { templateUrl: '/partials/about/page', 
			controller: 'homeCtrl', 
			title: 'Code | Josh Kirklin' })
			
		.when('/user/login', { templateUrl: 'partials/login/page', 
			controller: 'loginCtrl',
			title: 'User Login | Josh Kirklin' })
		.when('/user/profile/:reqUser', { templateUrl: 'partials/profile/page', 
			controller: 'profileCtrl',
			title: 'User Profile' })			
			
		.when('/blog/search', { templateUrl: 'partials/search/page', 
			controller: 'searchCtrl',
			title: 'Blog Search | Josh Kirklin' })
		.when('/blog/search/:reqTag', { templateUrl: 'partials/search/page', 
			controller: 'searchCtrl',
			title: 'Blog Search | Josh Kirklin' })
			
		.when('/blog', { templateUrl: 'partials/blog/page', 
			controller: 'blogCtrl',
			title: 'Code Blog | Josh Kirklin' })
		.when('/blog/:reqPost', { templateUrl: 'partials/blog/page', 
			controller: 'blogCtrl',
			title: 'Code Blog | Josh Kirklin' })					
			
		.when('/downloads', { templateUrl: 'partials/downloads/page', 
			controller: 'downloadsCtrl',
			title: 'Downloads | Josh Kirklin' })
			
		.otherwise({ redirectTo:'/'});
		
	$locationProvider.html5Mode(true);
	
});

codeApp.run(['$location', '$rootScope', function($location, $rootScope) {
    
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.hasOwnProperty('$$route')) {
            $rootScope.title = current.$$route.title;
        }
    });
	
}]);



//handle user session

var appSession = angular.module('appSession', [])

	.value('userSession', {
		name: 'Guest',
		isLoggedIn: false,
		sessionID: ''
	});
	
