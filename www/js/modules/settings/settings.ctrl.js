/**
 * settings controller definition
 * @scope Controllers
 */
define(function (require) {
	'use strict';
	var module = require('./module');
		
	module.controller('SettingsCtrl',
		['$scope','$q','config','Ping',function ($scope,$q,config,Ping) {
			$scope.master = config;
			$scope.canLogin = false;
			$scope.submitted = false;
			// pass in ngform so can access $dirty state
			$scope.update = function(settings,ngForm) {
				$scope.submitted = true;
				if(ngForm.serverUrl.$dirty){
						
					var promise = $q.when(Ping.checkServerConnection(settings.serverUrl));
		
					// success
					promise.then(function(){
						$scope.save(settings);
						$scope.canLogin = true;
					});
					// fail
					promise.catch(function(){
						
						ngForm.serverUrl.$invalid = true;
					});
				}
				else{
					$scope.save(settings);
					$scope.canLogin = true;
				}
			};

			$scope.reset = function() {
				$scope.settings = angular.copy($scope.master);
				$scope.submitted = false;
			};

			$scope.isUnchanged = function(settings) {
				return angular.equals(settings, $scope.master);
			};

			$scope.save = function(settings){
				$scope.master = angular.copy(settings);
				window.localStorage.setObject('config',$scope.master);
				$scope.reset();
			};

			$scope.reset();
		}]);
});