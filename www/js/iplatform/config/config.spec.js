define(
[
	'iplatform/config/config'
],
function (config){
	'use strict';
	describe('config', function() {
		
		var configMck = {
			serverUrl:'http://localhost:8080/ipWebServer/REST/ping'
		};

		it('is defined', function() {
		  expect(config).toBeDefined();
		});

		it('has boolean property: isSaved',function(){
			expect(config.isSaved).toBeDefined();
			expect(typeof config.isSaved).toBe('boolean');
			expect(config.isSaved).toBe(false);
		});

		describe('init', function() {

			it('should return true if config stored locally', function() {
				spyOn(localStorage, 'getObject').andReturn(true);
				var result = config.init();
				expect(result).toBe(true);
				expect(config.isSaved).toBe(true);
			});

			it('should call redirect if config not stored',function(){
				spyOn(localStorage, 'getObject').andReturn(false);
				spyOn(config,'redirect');
				config.init();
				expect(config.redirect).toHaveBeenCalled();
				expect(config.isSaved).toBe(false);
			});
		});

		describe('get', function() {

			it('should call redirect if config not stored',function(){
				spyOn(localStorage, 'getObject').andReturn(false);
				spyOn(config,'redirect');
				config.get('qwerty');
				expect(config.redirect).toHaveBeenCalled();
			});

			it('should return value if config has key', function() {
				spyOn(localStorage, 'getObject').andReturn(configMck);
				var result = config.get('serverUrl');
				expect(result).toBe(configMck.serverUrl);
			});

			it('should call redirect if config doesnt have key',function(){
				spyOn(localStorage, 'getObject').andReturn(configMck);
				spyOn(config,'redirect');
				config.get('qwerty');
				expect(config.redirect).toHaveBeenCalled();
			});
		});

		describe('redirect', function() {

			it('should change window.location.href',function(){
				config.redirect();
				expect(window.location.href).toContain('#/settings');
			});
		});
	});
});
