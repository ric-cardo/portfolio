(function (global) {
  var fileWithoutLeadingSlash;
  // array where all spec files will be included
  global.tests = [];

  for (var file in global.__karma__.files) {
    if (global.__karma__.files.hasOwnProperty(file)) {
      // get rid of leading slash in file path - prevents "no timestamp" error
      fileWithoutLeadingSlash = file.replace(/^\//, '');
      global.__karma__.files[fileWithoutLeadingSlash] = global.__karma__.files[file];
      delete global.__karma__.files[file];

      // we get all the test files automatically and store to window.tests array
      if (/spec\.js$/.test(fileWithoutLeadingSlash)) {
        global.tests.push(fileWithoutLeadingSlash);
      }
    }
  }
})(this);

// add extension file to prevent test failing due to window has no method
tests.push('window.extensions')

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: 'base/www/js',

    paths: {
       	//libs
           jquery:["lib/jquery"],
           angular:["lib/angular.min"],
           'angular-mocks':["lib/angular-mocks"],
           'ui-router': 'lib/angular-ui-router.min',
           underscore:["lib/underscore"],
           stacktrace:["lib/stacktrace.min"],
          pouchdb:["lib/pouchdb.min"],
          // iplatform modules
          'ip.ping':['./iplatform/ping/ping'],
          'ip.config':['./iplatform/config/config']
       },
   	shim: {
   		angular: {exports: 'angular'},
   		'angular-mocks':{deps:['angular']},
   		'ui-router': {deps:['angular']},
   		underscore: {exports: '_'},
   		stacktrace: {exports: 'printStackTrace'},
   		pouchdb: {exports: 'pouchdb'}
   	},

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});