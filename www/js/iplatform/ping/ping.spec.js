define(
[
	'iplatform/ping/ping'
],
function (ping){
	'use strict';
	describe('ping', function() {
		var serverUrl ='http://localhost:8080/ipWebServer/REST/ping';
		
		it('is defined', function() {
		  expect(ping).toBeDefined();
		});

		it('define boolean property: internetConnection',function(){
			expect(ping.internetConnection).toBeDefined();
			expect(typeof ping.internetConnection).toBe('boolean');
			expect(ping.internetConnection).toBe(false);
		});

		it('define boolean property: serverConnection',function(){
			expect(ping.serverConnection).toBeDefined();
			expect(typeof ping.serverConnection).toBe('boolean');
			expect(ping.serverConnection).toBe(false);
		});

		describe('checkInternetConnection',function(){

			it('should return true if there is a internet connection', function() {
				var result = ping.checkInternetConnection();
				expect(result).toBe(true);
				expect(ping.internetConnection).toBe(true);
			});

			it('should return false if there is not a internet connection', function() {
				spyOn(ping, 'getOnlineStatus').andReturn(false);
				var result = ping.checkInternetConnection();
				expect(result).toBe(false);
				expect(ping.internetConnection).toBe(false);
			});
		});

		describe('getOnlineStatus',function(){

			it('should return a boolean', function() {
				var result = ping.getOnlineStatus();
				expect(typeof result).toBe('boolean');
			});
		});

		describe('sendRequest',function(){

			var callbacks;
			var configuration = {
				url: 'ProductData.json',
				timeout: 30000
			};

			beforeEach(function(){
				callbacks = {
					success: jasmine.createSpy(),
					error: jasmine.createSpy(),
				};
			});

			it('should make an Ajax request to the correct URL', function() {
				spyOn($, 'ajax');

				ping.sendRequest(callbacks, configuration);
				expect($.ajax.mostRecentCall.args[0].url).toEqual(configuration.url);
			});

			it('should receive a successful response', function() {
				spyOn($, 'ajax').andCallFake(function(e) {
					e.success({});
				});
			 
				ping.sendRequest(callbacks, configuration);
				expect(callbacks.success).toHaveBeenCalled();  //Verifies this was called
				expect(callbacks.error).not.toHaveBeenCalled();  //Verifies this was NOT called
			});

			it('should receive an Ajax error', function() {
				spyOn($, 'ajax').andCallFake(function(e) {
					e.error({});
				});

				ping.sendRequest(callbacks, configuration);
				expect(callbacks.success).not.toHaveBeenCalled();  //Verifies this was called
				expect(callbacks.error).toHaveBeenCalled();  //Verifies this was NOT called
			});
		});

		describe('checkServerConnection',function(){

			it('sets serverConnection to true on successful ping', function() {
				
				spyOn($,'ajax').andCallFake(function ()
				{
					var d = $.Deferred();
					d.resolve();
					return d.promise();
				});
				
				ping.checkServerConnection(serverUrl);
				expect(ping.serverConnection).toBe(true);
			});

			it('sets serverConnection to false on unsuccessful ping', function() {
				
				spyOn($,'ajax').andCallFake(function ()
				{
					var d = $.Deferred();
					d.reject();
					return d.promise();
				});
				
				ping.checkServerConnection(serverUrl);
				expect(ping.serverConnection).toBe(false);
			});
		});


	});
});
