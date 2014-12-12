var codeApp = angular.module('codeApp', [
	'ngRoute',
	'ngResource',
	'appControllers'
]);

codeApp.config(function($locationProvider, $routeProvider){

	$routeProvider
	
		.when('/', { templateUrl: '/partials/home/page', 
			controller: 'homeCtrl', 
			title: 'Code | Josh Kirklin' })
			
		.when('/blog', { templateUrl: 'partials/blog/page', 
			controller: 'blogCtrl',
			title: 'Code Blog | Josh Kirklin' })
		.when('/blog/:reqPost', { templateUrl: 'partials/blog/page', 
			controller: 'blogCtrl',
			title: 'Code Blog | Josh Kirklin' })			
			
		.when('/search', { templateUrl: 'partials/search/page', 
			controller: 'searchCtrl',
			title: 'Blog Search | Josh Kirklin' })
		.when('/search/:reqTag', { templateUrl: 'partials/search/page', 
			controller: 'searchCtrl',
			title: 'Blog Search | Josh Kirklin' })			
			
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