define([],function(){
	'use strict';
	window.Storage.prototype.setObject = function(key, value) {
		this.setItem(key, JSON.stringify(value));
	};

	window.Storage.prototype.getObject = function(key) {
		var value = this.getItem(key);
		return value && JSON.parse(value);
	};
});
