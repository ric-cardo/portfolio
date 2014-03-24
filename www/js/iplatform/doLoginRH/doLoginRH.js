/**
 * doLogin request handler
 * @param  {[type]} $              [jquery]
 * @param  {[type]} RequestHandler [base request handler module]
 * @param  {[type]} ajax           [ajax request module]
 * @return {object}        [dologin]
 */
define(function (require) {
  'use strict';
  var $ = require('jquery'),
  RequestHandler = require('requestHandler'),
  ping = require('ip.ping'),
  config = require('ip.config')
  ;

  var doLoginRH = new RequestHandler({
    nextWorkflow: 'jobs',
    onErrorWorkflow:'login',
  });

  doLoginRH.urlSuffix ='/ipWebServer/REST/login';
  // gathers input field data and sends login request to server
  doLoginRH.invoke = function(context){
    var self = this,
        physicalDeviceID = this.getPhysicalDeviceID();
    
    sessionStorage.removeItem('loginError');
    
    var serverUrl = config.get('serverUrl'),
        loginUrl = serverUrl + this.urlSuffix;
    
    var data = {
      userName :  context.username,
      userPassword : context.password,
      physicalDeviceID : physicalDeviceID
    };

   var defer = $.Deferred();
     ping.checkServerConnection(serverUrl)
        .then(function(){
          defer.resolve(self.remoteLogin(loginUrl,data));
        },function(){
          defer.resolve(self.localLogin(data));
        });
    return defer.promise();
  };

  doLoginRH.remoteLogin = function(url,data)
  {
    return $.getJSON(url,data);
  };

  doLoginRH.localLogin = function(data)
  {
    return this.loginMock(data);
  };

  doLoginRH.getPhysicalDeviceID = function()
  {
    return 'deviceA';
  };

  doLoginRH.loginMock =function(data){
    
    var defer = $.Deferred();
    defer.resolve();
    return defer.promise();
  };

  return doLoginRH;
});





  