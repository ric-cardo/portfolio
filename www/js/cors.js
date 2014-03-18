/*global Promise,XDomainRequest*/
define([], function() {
  'use strict';
  var request =  {

    // returns get request that return result as JSON
    getJSON:function(url,data) {
      return this.get(url,data).then(JSON.parse);
    },
    // returns query section of get url
    getAttachData:function(obj)
    {
      var url ='';
      var i = 0;
      for (var propt in obj)
      {
        if (obj.hasOwnProperty(propt))
        {
          var f =[propt,obj[propt]].join('=');
           
          if(i > 0)
          {
            url = [ url , f].join('&');
          }
          else
          {
            url = f;
          }

          i++;
        }

      }
      return url;
    },

    // returns get request  
    get:function(url,data) {
      // attach data to url
      if(typeof data === 'object')
      {
        url = url + this.getAttachData(data);
      }
      
      return this.makeCorsRequest('GET',url);
    },

    // Make the actual CORS request.
    makeCorsRequest:function(method,url) {
      var self = this;
      return new Promise(function(resolve, reject) {

        var req = self.createCORSRequest(method, url);
        if (!req) {
          reject( new Error('CORS not supported'));
        }

        // Response handlers.
        req.onload = function() {
          // This is called even on 404 etc
          // so check the status
          if (req.status === 200) {
            // Resolve the promise with the response text
            resolve(req.response);
          }
          else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject( new Error(req.statusText));
          }
        };

        // Handle network errors
        req.onerror = function() {
          reject(new Error('Network Error'));
        };

        // Make the request
        req.send();
      });
    },
    // Create the XHR object.
    createCORSRequest: function(method, url) {
      var xhr = new XMLHttpRequest();
      if ('withCredentials' in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
      }
      else if (typeof XDomainRequest !== 'undefined') {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
      }
      else {
        // CORS not supported.
        xhr = null;
      }
      return xhr;
    }
  };

  return request;
});













  