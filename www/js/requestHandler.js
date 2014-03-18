// base request handler module
define([],function () {
	'use strict';
	function RequestHandler(config){
		this.nextWorkflow = config.nextWorkflow;
		this.onErrorWorkflow = config.onErrorWorkflow;
	}

	RequestHandler.prototype.invoke = function(){
		window.alert('Base RequestHandler: invoke');
	};

	// loads the workflow html into the page
	// html - string - path to view file
	RequestHandler.prototype.routeTo = function(next){
		
		var current = window.location.hash.split('#/')[1];
		
		if(next === current)
		{
			location.reload(true);
		}
		else
		{
			var hash = '#/';
			window.location.hash = hash + next;
			console.log(window.location.href);	
		}

		
		// determine if reload needed
		// prevent reloading from cache
		// remove
		//console.log(html);
		
	};

	return RequestHandler;
});



