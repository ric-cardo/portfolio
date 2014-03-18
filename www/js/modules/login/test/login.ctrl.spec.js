define([
  'angular-mocks',
  'modules/login/login.ctrl'
],
function(){
	'use strict';
	describe('LoginCtrl', function() {

		var scope,
			ctrl,
			frontCtrlMock ={
			  invoke:function(){}
			}
			;
		
		beforeEach(module('app.login'));
		beforeEach(
			inject(function ($rootScope,$controller) {
				scope = $rootScope.$new();
				ctrl = $controller('LoginCtrl', {
					$scope: scope,
					FrontController:frontCtrlMock
				});
			})
		);

		it('is defined', function() {
			expect(ctrl).toBeDefined();
		});

		it('has object property: user',function(){
			expect(scope.user).toBeDefined();
			expect(typeof scope.user).toBe('object');
		});

		describe('login',function(){

			it('should call frontcontroller invoke method',function(){
				spyOn(frontCtrlMock,'invoke').andReturn();
				scope.login();
				expect(frontCtrlMock.invoke).toHaveBeenCalledWith('doLogin',scope.user);
			});
		});
	});
});

