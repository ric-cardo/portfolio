/**
 * Subjobs controller definition
 * @scope Controllers
 */
define(function (require) {
	'use strict';
	var module = require('./module');
	module.controller('SubJobCtrl',
		['$scope','$q','subjobs', function ($scope,$q,subjobs) {
		$scope.subjobs = subjobs;
	}]);
});