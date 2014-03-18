'use strict';

require.config({
	baseUrl: './js',
	waitSeconds: 15,
	//deps:['main'], // load this file after configurating
	paths: {
		//libs
		jquery:['lib/jquery'],
		angular:['lib/angular.min'],
		'ui-router': 'lib/angular-ui-router.min',
		underscore:['lib/underscore'],
		stacktrace:['lib/stacktrace.min'],
		pouchdb:['lib/pouchdb.min'],
		// iplatform modules
		'ip.ping':['./iplatform/ping/ping'],
		'ip.config':['./iplatform/config/config']
	},
	shim: {
		angular: {exports: 'angular'},
		'ui-router': {deps:['angular']},
		underscore: {exports: '_'},
		stacktrace: {exports: 'printStackTrace'},
		pouchdb: {exports: 'pouchdb'}
	},
	deps:['main']
});

