// ping gateway service
define(function (require) {
	'use strict';
	var ping = require('ip.ping'),
	angular = require('angular'),
	service = angular.module('app.ping',[]);
	
	service.factory('Ping', function() {
	  return ping;
	});

	return service;
});