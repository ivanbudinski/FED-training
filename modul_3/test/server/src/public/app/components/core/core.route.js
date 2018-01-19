(function(){
	"use strict";

	angular
		.module('warehouse.core')
		.config(config);

	config.$inject=['$stateProvider', '$urlRouterProvider'];	
	function config($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('main',{
				abstract:true,
				views:{
					'header':{
						templateUrl:'app/components/core/header.html'
					}
				}
			})
			.state('main.home',{
				url:'/home',
				views:{
					'content@':{
						templateUrl:'app/components/core/home.html',
					}
				}
			})
			.state('main.about',{
				url:'/about',
				views:{
					'content@':{
						templateUrl:'app/components/core/about.html',
					}
				}
			});
	}
})();