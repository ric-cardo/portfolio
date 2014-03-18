/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define(
[
	'angular',
	'window.extensions',
	'app',
	'routes',
],
function (angular) {
	'use strict';
	/* place operations that need to initialize prior to app start here
	 * using the `run` function on the top-level module
	 */
	angular.element(document).ready(function () {
		angular.bootstrap(document, ['app']);
	});
});