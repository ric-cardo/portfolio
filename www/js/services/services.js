
define(function (require) {
  'use strict';
  var printStackTrace = require('stacktrace');
  var PouchDB = require('pouchdb');
  var services = angular.module('app.services', []);

  services.factory('pouchdb', function() {
    PouchDB.enableAllDbs = true;
    return new PouchDB('myApp');
  });

  services.factory('db', function($q, pouchdb, $rootScope) {

    return {
      // adds multiple records to database
      addBatch:function(array){
        var deferred = $q.defer();
        pouchdb.bulkDocs({docs:array},function(err, res) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
        });
        return deferred.promise;
      },
      info:function(){
        var deferred = $q.defer();
        pouchdb.info(function(err, res) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
        });
        return deferred.promise;
      },
      getAll: function(){
        var deferred = $q.defer();
        /*jshint camelcase: false */
        pouchdb.allDocs({include_docs: true},function(err, res) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
        });
        return deferred.promise;
      },
      add: function(doc) {
        var deferred = $q.defer();
        pouchdb.post(doc, function(err, res) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
        });
        return deferred.promise;
      },
      remove: function(doc) {
        var deferred = $q.defer();
        pouchdb.remove(doc, function(err, res) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
        });
        return deferred.promise;
      },
      get: function(id) {
        var deferred = $q.defer();
        pouchdb.get(id, function(err, res) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
        });
        return deferred.promise;
      },
      update: function(doc) {
        var deferred = $q.defer();
        pouchdb.put(doc, function(err, res) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
        });
        return deferred.promise;
      }
    };
  });

  services.factory('stacktraceService',function() {
        // 'printStackTrace' is a global object.
        return({
          print: printStackTrace
        });
      }
  );

  services.provider('$exceptionHandler',
    {
      $get: function( errorLogService ) {

        return( errorLogService );

      }
    }
  );

  services.factory('errorLogService',
  function( $log, $window, stacktraceService ) {

                // I log the given error to the remote server.
                function log( exception, cause ) {

                    // Pass off the error to the default error handler
                    // on the AngualrJS logger. This will output the
                    // error to the console (and let the application
                    // keep running normally for the user).
                  $log.error.apply( $log, arguments );

                    // Now, we need to try and log the error the server.
                    // --
                    // NOTE: In production, I have some debouncing
                    // logic here to prevent the same client from
                    // logging the same error over and over again! All
                    // that would do is add noise to the log.
                  try {

                    var errorMessage = exception.toString();
                    var stackTrace = stacktraceService.print({ e: exception });

                      // Log the JavaScript error to the server.
                      // --
                      // NOTE: In this demo, the POST URL doesn't
                      // exists and will simply return a 404.
                    $.ajax({
                      type: 'POST',
                      url: './javascript-errors',
                      contentType: 'application/json',
                      data: angular.toJson({
                        errorUrl: $window.location.href,
                        errorMessage: errorMessage,
                        stackTrace: stackTrace,
                        cause: ( cause || '' )
                      })
                    });
                  } catch ( loggingError ) {

                      // For Developers - log the log-failure.
                      $log.warn( 'Error logging failed' );
                      $log.log( loggingError );
                    }
                }
                // Return the logging function.
                return( log );

              }
              );
  return services;
});

