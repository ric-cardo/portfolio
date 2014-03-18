define(function (require) {
	'use strict';
	var angular = require('angular'),
	frontController =  require('frontController'),
	service = angular.module('services.frontController',[]);
	
	service.factory('FrontController', function() {
	  frontController.init();
	  return frontController;
	});

	return service;
});
