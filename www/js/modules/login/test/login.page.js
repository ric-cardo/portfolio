/*
    page object to reduce test spec verbosity
    represents login page
 */
'use strict';
var LoginPage = function() {
    this.username = element(by.model('user.username'));
    this.password = element(by.model('user.password'));
    this.loginButton = element(by.css('#login'));
    this.alertBox = element(by.css('.alert-box'));
    this.login = function(userName, password)
    {
        this.username.sendKeys(userName);
        this.password.sendKeys(password);
        var promise = this.loginButton.click()
        browser.waitForAngular();
        
        return promise; 
    };
};

module.exports = new LoginPage();