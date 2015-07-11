
/* SERVICES =========================================================*/

var appServices = angular.module('appServices', []);

// Config Provider
/*
mainApp.provider('configProvider', function(){
	var t = this;
	
	this.en = "badDir";
	this.$get = function(){
		return t.en;
	}
});
*/
// General AJAX handler

appServices.factory('requestService', function($http){
	var requestService = {
		get: function(reqURI, allowCache){
			var promise = $http({
				url: reqURI,
				method: 'GET',
				cache: allowCache
			})
			.then(function(res){
				return res.data;
			});
			return promise;
		},
		post: function(reqURI, submitData){
			var promise = $http({
				url: reqURI,
				method: 'POST',
				data: submitData
			}).then(function(res){
				return res.data;
			});
			return promise;
		}
	};
	return requestService;
});



// These are for persisting and/or communicating data across routes

function SessionData(){
	var t = this;
	
	this.isLoggedIn = false;
	this.user = {
		name: "Guest" + Math.floor((Math.random() * 1000000) + 1)
	};
}
var _sessionData = new SessionData();


function AppData(){
	var t = this;
	
}
var _appData = new AppData();


function BlogData(){
	var t = this;
	
}
var _blogData = new BlogData();



// Expose data service groups to controllers ---------------------------------------------

appServices.factory('homeServiceGroup', function(){
	return {
		
	};
});

appServices.factory('blogServiceGroup', function(){
	return {
		session: _sessionData,
		blog: _blogData
	};
});

