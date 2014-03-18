define(
[
	'angular-mocks',
	'modules/settings/settings.ctrl'
],
function(){
	'use strict';
	describe('SettingsCtrl', function() {

		var scope,
			q,
			controller,
			defer,
			ctrl,
			settings = {
				serverUrl:'http://localhost:8080'
			};

		
		beforeEach(module('app.settings'));
		beforeEach(
			inject(function ($rootScope,$q,$controller) {
				controller = $controller;

				scope = $rootScope.$new();
				q = $q;
				ctrl = $controller('SettingsCtrl', {
					$scope: scope,
					config:settings
				});
			})
		);

		it('is defined', function() {
			expect(ctrl).toBeDefined();
		});

		it('has object property: master',function(){
			expect(scope.master).toBeDefined();
			expect(typeof scope.master).toBe('object');
		});

		it('has boolean property: submitted',function(){
			expect(scope.submitted).toBeDefined();
			expect(typeof scope.submitted).toBe('boolean');
			expect(scope.submitted).toBe(false);
		});

		it('calls reset on init', function() {
			expect(scope.settings).toBeDefined();
			expect(scope.settings).toEqual(scope.master);
		});

		describe('update',function(){

			it('should set submitted to true',function(){
				spyOn(scope,'save').andReturn();
				scope.update(settings,{serverUrl:{$dirty:false}});
				expect(scope.submitted).toBe(true);
			});

			it('should call save if serverUrl unchanged',function(){
				spyOn(scope, 'save');
				scope.update(settings,{serverUrl:{$dirty:false}});
				expect(scope.master).toEqual(settings);
				expect(scope.save).toHaveBeenCalledWith(settings);
			});

			it('should call save if serverUrl changed and ping successful',function(){
				spyOn(scope,'save');
				spyOn(q, 'when').andCallFake(function() {
					defer = q.defer();
					defer.resolve();
					return defer.promise;
				});
				scope.update(settings,{serverUrl:{$dirty:true}});
				scope.$apply();
				expect(scope.save).toHaveBeenCalled();
			});

			it('should alert and not call save if serverUrl changed and ping unsuccessful',function(){
				
				spyOn(scope,'save');
				spyOn(q, 'when').andCallFake(function() {
					defer = q.defer();
					return defer.promise;
				});
				scope.update(settings,{serverUrl:{$dirty:true}});
				defer.reject();
				scope.$apply();
				expect(scope.save).not.toHaveBeenCalled();
			});
		});

		describe('reset',function(){
			
			it('should revert settings to previous values',function(){
				scope.settings ={};
				scope.reset();
				expect(scope.settings).toEqual(scope.master);
			});
		});

		describe('isUnchanged',function(){
			beforeEach(function(){
				scope.reset();
			});
			it('should return true if settings unchanged',function(){
				var result = scope.isUnchanged(scope.settings);
				expect(result).toBe(true);
			});

			it('should return false if settings changed',function(){
				scope.settings ={};
				var result = scope.isUnchanged(scope.settings);
				expect(result).toBe(false);
			});
		});

		describe('save',function(){
			beforeEach(function(){
				scope.master = {};
			});
			
			it('should store settings',function(){
				spyOn(localStorage, 'setObject');
				scope.save(settings);
				expect(localStorage.setObject).toHaveBeenCalledWith('config',scope.master);
			});

			it('should update master to new settings',function(){
				scope.save(settings);
				expect(scope.master).toEqual(settings);
			});

			it('should call reset',function(){
				spyOn(scope, 'reset');
				scope.save(settings);
				expect(scope.reset).toHaveBeenCalled();
			});
		});
	});
});

