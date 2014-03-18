
define(function() {
	'use strict';
	var frontController ={
		workflows: {},
		init: function(){
			
			this.getDefaultWorkFlowComponent();
			// .then(function(xml){
			// 	self.parseXML(xml);
			// 	sessionStorage.setItem('workflow',true);
			// 	self.invoke('loginUI');
			// });
		},
		// gets the default workflow from filesystem
		getDefaultWorkFlowComponent:function(){
			var self = this;
			console.log('getting default WorkFlow');
			var xhr = new XMLHttpRequest();
			//return new Promise(function(resolve, reject) {
				
			xhr.onload = function() {
				self.parseXML(xhr.responseXML);
				//self.invoke('loginUI');	 
			};
			xhr.onerror = function() {
			  //reject('Error while getting XML.');
			};
			xhr.open('GET', 'defaultWorkflow.xml');
			xhr.responseType = 'document';
			xhr.send();
			//})	
		},
		// calls the invoke function of the given workflow's request handler
		invoke: function(workflow,context){
			var defer = $.Deferred();
			
			
			var requestHandler = this.workflows[workflow].requestHandler;
			var file = ['iplatform',requestHandler,requestHandler].join('/');
			require([file],function(requestHandler){
				
				defer.resolve(requestHandler.invoke(context));
			});

			return defer.promise();
		},
		// parses the xml into an object, attaches it as a property to the frontcontroller 
		parseXML: function(xml) {
			var workflowCollection = xml.getElementsByTagName('workflowComponent');
			
			for (var i = 0; i < workflowCollection.length; i++)
			{
				var workflow = workflowCollection[i];
				var name = workflow.getAttribute('name');
				var requestHandler = workflow.getElementsByTagName('requestHandler')[0];
				this.workflows[name] ={
					requestHandler: requestHandler.getAttribute('localJS'),
					onErrorWorkflow: requestHandler.getAttribute('onErrorWorkflowComonent') ,
					nextWorkflow: workflow.getElementsByTagName('target')[0].getAttribute('nextWorkflowComponent') ,
				};
			}
		}
	};

	return frontController;
});

