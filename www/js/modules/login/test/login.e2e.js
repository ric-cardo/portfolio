'use strict';
var util = require('util');

describe('login page', function() {

	var loginPage = require('./login.page.js');
	// get pass redirection on no config setting in localstorage	
	browser.get('#/settings');
	browser.executeScript('localStorage.setObject("config",{serverUrl:"http://localhost:8080"})');
	

	beforeEach(function(){
		browser.get('#/login');
		browser.waitForAngular();
	});

	it('should have correct url', function() {
		expect(browser.getCurrentUrl()).toContain('login');
	});

	it('should show with blank username and password', function() {
		var username = loginPage.username.getAttribute('value');
		var password = loginPage.password.getAttribute('value');

		expect(username).toEqual('');
		expect(password).toEqual('');
	});

	describe('successful login', function() {

		it('should goto jobs page on successful login ', function() {
			loginPage.login('userName','h1234.K1234')
			expect(browser.getCurrentUrl()).toContain('jobs');
		});
	});


	describe('unsuccessful login', function() {
		it('should alert user to unsuccessful login ', function() {
			
			loginPage.login('erroruser','pass')
			expect(browser.getCurrentUrl()).toContain('login');
			// .then(function(){

			// 	browser.getCurrentUrl().then(function(value){
			// 		expect(value).toContain('login');
			// 	})
			// 	loginPage.alertBox.isDisplayed().then(function(value){
			// 		expect(value).toBe(true);
			// 	});
			// })
		});
	});	
});