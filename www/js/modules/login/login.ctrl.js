/**
 * Home controller definition
 * @scope Controllers
 */
define(function (require) {
	'use strict';
	var module = require('./module');

	module.controller('LoginCtrl',
	['$scope','$q','$rootScope','$state','FrontController',
	function ($scope,$q,$rootScope,$state,FrontController){
		$scope.user ={};
		$scope.loginError = sessionStorage.getItem('loginError') || false;
		$scope.login = function(){
			var p =$q.when(FrontController.invoke('doLogin',$scope.user));
			
			p.then(function(data){
				if(data.hasOwnProperty('errormessage'))
				{
				 $scope.loginError = data.errormessage;
				 $scope.$apply();
				}
				else
				{
					$state.transitionTo('jobs');
				}
			});



			
		};
	}]);
});