define(
[
	'iplatform/config/config'
],
function (config){
	'use strict';
	ddescribe('ping', function() {

		it('is defined', function() {
		  expect(config).toBeDefined();
		});
	});
});
