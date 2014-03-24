'use strict';
var ping = {
	checkServerConnection:function(){},
	getServerConnection:function(){}
};
define('ip.ping',[],ping);

function successResponse(response)
{
	var defer = $.Deferred();
	defer.resolve(response);
	return defer.promise();
}
function errorResponse(response)
{
	var defer = $.Deferred();
	defer.reject(response);
	return defer.promise();
}

define(
[
	'iplatform/doLoginRH/doLoginRH'
],
function (doLoginRH){

	describe('doLoginRH', function() {
		var serverUrl ='http://localhost:8080/ipWebServer/REST/login',
			
			user = {
				username : 'userName' ,
				password : 'h1234.K1234',
			},

			data = {
				userName :  user.username,
				userPassword : user.password,
				physicalDeviceID : 'deviceA'
			},
			errorMsg = {errormessage:'002-2-001 - Invalid username entered'};

		it('is defined', function() {
		  expect(doLoginRH).toBeDefined();
		});

		it('has string property: nextWorkflow',function(){
			expect(doLoginRH.nextWorkflow).toBeDefined();
			expect(typeof doLoginRH.nextWorkflow).toBe('string');
			expect(doLoginRH.nextWorkflow).toBe('jobs');
		});

		it('has string property: onErrorWorkflow',function(){
			expect(doLoginRH.onErrorWorkflow).toBeDefined();
			expect(typeof doLoginRH.onErrorWorkflow).toBe('string');
			expect(doLoginRH.onErrorWorkflow).toBe('login');
		});

		describe('invoke',function(){

			describe('has server connection',function(){
				it('should call remoteLogin',function(){
					spyOn(doLoginRH, 'remoteLogin');
					spyOn(ping, 'checkServerConnection').andReturn(successResponse());
					doLoginRH.invoke(user);
					expect(ping.checkServerConnection).toHaveBeenCalled();
					expect(doLoginRH.remoteLogin).toHaveBeenCalledWith(serverUrl,data);
				});
			});
			describe('has no server connection',function(){
				it('should not call localLogin',function(){
					spyOn(doLoginRH, 'localLogin');
					spyOn(ping, 'checkServerConnection').andReturn(errorResponse());
					doLoginRH.invoke(user);
					expect(ping.checkServerConnection).toHaveBeenCalled();
					expect(doLoginRH.localLogin).toHaveBeenCalledWith(data);
				});
			});
		});

		describe('remoteLogin',function(){

			it('should make request to the server and return promise', function() {
				spyOn($, 'getJSON').andReturn(successResponse('resolved'));
				var result = doLoginRH.remoteLogin(serverUrl,data);
				expect($.getJSON).toHaveBeenCalled();
				expect(typeof result.then).toBe('function');
			});
		});

		describe('localLogin',function(){

			it('should return a promise', function() {
				spyOn(doLoginRH, 'loginMock').andReturn(successResponse('resolved')); //;
				var result = doLoginRH.localLogin(data);
				expect(typeof result.then).toBe('function');
			});
		});

		describe('onSuccess',function(){

			it('should call routeTo on successfully login', function() {
				spyOn(doLoginRH, 'routeTo');
				doLoginRH.onSuccess(data);
				expect(doLoginRH.routeTo).toHaveBeenCalledWith('jobs');
			});

			it('should call onError on unsuccessfully login', function() {
				spyOn(doLoginRH, 'onError');
				doLoginRH.onSuccess(errorMsg);
				expect(doLoginRH.onError).toHaveBeenCalled();
			});
		});

		describe('onError',function(){

			it('should call routeTo', function() {
				spyOn(doLoginRH, 'routeTo');
				doLoginRH.onError(data);
				expect(doLoginRH.routeTo).toHaveBeenCalledWith('login');
			});
		});
	});
});
