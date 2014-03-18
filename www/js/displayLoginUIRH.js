define(['requestHandler'], function(RequestHandler) {
	'use strict';
	var displayLoginUIRH = new RequestHandler({
		nextWorkflow: 'loginUI',
		folder:'views/'
	});

	displayLoginUIRH.invoke = function(){
		this.render(this.nextWorkflow);
	};
	
	return displayLoginUIRH;
});




