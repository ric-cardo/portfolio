define(['requestHandler'], function(RequestHandler) {
	'use strict';
	var displaySubjobsUIRH = new RequestHandler({
		nextWorkflow: 'subJobs',
		folder:''
	});

	displaySubjobsUIRH.invoke = function(){
		this.render(this.nextWorkflow);
	};

	return displaySubjobsUIRH;
});