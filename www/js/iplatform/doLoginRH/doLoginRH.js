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
    //test user
    if(!context.username)
    {
      context.username = 'userName';
      context.password = 'h1234.K1234';
    }
    
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
    var self = this;
    return $.getJSON(url,data);
    //.then(function(response){self.onSuccess(response);},function(error){self.onError(error);});
  };

  doLoginRH.localLogin = function(data)
  {
    var self = this;
    return this.loginMock(data);
    //.then(function(response){self.onSuccess(response);},function(error){self.onError(error);});
  };

  // success handler for login
  doLoginRH.onSuccess = function(data){
    
    if(data.hasOwnProperty('errormessage'))
    {
      this.onError(data.errormessage);
      return false;
    }

    this.routeTo(this.nextWorkflow);
  };

  // error handler for login
  doLoginRH.onError = function(error)
  {
    sessionStorage.setItem('loginError',error);
    this.routeTo(this.onErrorWorkflow);
  };

  doLoginRH.getPhysicalDeviceID = function()
  {
    return 'deviceA';
  };

  doLoginRH.loginMock =function(data){
    console.log(data);
    var defer = $.Deferred();
    defer.resolve();
    return defer.promise();
  };

  return doLoginRH;
});





  