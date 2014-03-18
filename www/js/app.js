/*global define*/
'use strict';

define(function (require) {
  var angular = require('angular');
  require('ui-router');
  //modules
  require('modules/login/index');
  require('modules/jobs/index');
  require('modules/subJobs/index');
  require('modules/settings/index');
  // dependencies
  var deps = [
    'ui.router',
    'app.login',
    'app.jobs',
    'app.subJobs',
    'app.settings'
	];

  var app = angular.module('app',deps);

  return app;
});