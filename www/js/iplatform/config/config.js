/**
 * config settings
 * @scope Controllers
 */
define(function () {
	'use strict';
	// extend 
	
	// Define the class methods.
	var config = {
		isSaved:false,
		init:function(){
			if(localStorage.getObject('config'))
			{
				this.isSaved = true;
				return true;
			}
			else
			{
				this.isSaved = false;
				this.redirect();
			}
		},
		get:function(key){

			var config = localStorage.getObject('config');
			
			// if config object stored locally
			if(config){

				if(config.hasOwnProperty(key))
				{
					return config[key];
				}
				else
				{
					this.redirect();
				}
			}
			else
			{
				this.redirect();
			}
		},
		redirect:function()
		{
			window.location.href = '#/settings';
		}
	};
	
	return config;
});