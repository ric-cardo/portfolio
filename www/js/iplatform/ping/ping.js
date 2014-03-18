/**
 * ping server to ensure connection
 * @scope Controllers
 */
define(function (require) {
	'use strict';
	var $ = require('jquery'),
	// Define the class methods.
	ping= {
		serverConnection:false,
		internetConnection: false,
		urlSuffix:'/ipWebServer/REST/ping',
		checkInternetConnection: function(){
			var status = this.getOnlineStatus();
			this.internetConnection = status;
			return status;
		},
		getOnlineStatus: function(){
			return navigator.onLine;
		},
		checkServerConnection:function(url){
			var self = this,
			promise;
			url += this.urlSuffix;
			promise = $.getJSON(url);
			promise.done(function(){
				self.serverConnection = true;
			});
			promise.fail(function(){
				self.serverConnection = false;
			});
			return promise;
		},
		sendRequest:function (callbacks,config) {
			return $.ajax({
				url: config.url,
				//dataType: 'json',
				success: function(data) {
					callbacks.success(data);
				},
				error: function(data) {
					callbacks.error(data);
				},
				timeout: config.timeout
			});
		},
		getServerConnection:function()
		{
			return this.serverConnection;
		}
	};
	
	return ping;
});