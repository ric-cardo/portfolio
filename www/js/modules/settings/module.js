/**
 * Attach controllers to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array.
 * below, you can see we bring in our services and constants modules
 * which avails each controller of, for example, the `config` constants object.
 **/
define(['angular','ui-router','services/ping'], function (angular) {
  'use strict';
  var module = angular.module('app.settings', ['ui.router','app.ping']);
  
  module.config(function config( $stateProvider ) {
		$stateProvider.state('settings', {
			url: '/settings',
			templateUrl: 'js/modules/settings/settings.html',
			controller: 'SettingsCtrl',
			resolve:{
				config:function(){
					var config = window.localStorage.getObject('config');
					return config;
				}
			}
		});
	});

  
  return module;
});
