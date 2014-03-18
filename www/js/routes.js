define(function (require) {
	'use strict';
	var app = require('app');
	// app.run(['$state', function ($state) {
	//        $state.transitionTo('login'); 
	//     }])
	app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
	// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise('/login');
		$urlRouterProvider.when('/login', ['$state',function ($state) {
			if (!localStorage.getItem('config')) {
				$state.transitionTo('settings');
			}
			else
			{
				$state.transitionTo('login');
			}
		}]);
		$stateProvider
			.state('login', {
			url: '/login',
			templateUrl: 'js/modules/login/login.html',
			controller:'LoginCtrl'
		})
		.state('jobs', {
			url: '/jobs',
			templateUrl: 'js/modules/jobs/jobs.html',
			controller: 'JobCtrl',
			resolve:{
				typeOptions:function(){
					var opt = [
						{name:'proximity',value:'proximity'},
						{name:'priority',value:'priority'},
						{name:'date',value:'date'}
					];
					return opt;
				}
			}
		})
		.state('subjobs', {
			url: '/jobs/:jobId/subjobs',
			templateUrl: 'js/modules/subjobs/subjobs.html',
			controller: 'SubJobCtrl',
			resolve:{
				subjobs:function($q,db,$stateParams){
					var id = $stateParams.jobId;
					return db.get(id).then(function(res){
						return res;
					});
				}
			}
		});
	//$locationProvider.html5Mode(true);
	}]);
});