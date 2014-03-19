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
				},
				jobs:function(db){

					return db.info().then(function(res){
						if(res.doc_count === 0)
						{
							var jobs =[
					          { ref:'123',client:'mr smith',date: 1288323623006, proximity:20,priority:1, subJobs:[{},{},{}]},
					          { ref:'124',client:'mrs smith',date: new Date(2014,1,25), proximity:10,priority:2, subJobs:[{},{},{}]},
					          { ref:'125',client:'mr doe',date: new Date(2014,1,22), proximity:30,priority:3, subJobs:[{},{},{}]},
					          { ref:'126',client:'mrs doe',date: new Date(2014,1,21), proximity:40,priority:3, subJobs:[{},{},{}]}
					        ];

					        return db.addBatch(jobs).then(function(res) {
								return db.getAll()
						    });   
						}
						else
						{
							return db.getAll()
						}

						
					});
					
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