// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
     'browserName': 'chrome',
     'chromeOptions': {
         'args': ['--disable-web-security']
       }
     //'browserName': 'phantomjs', 
    // 'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs',
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['www/js/**/*.e2e.js'],
 
  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost/phonegap-apps/test-app/www/',
  
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    includeStackTrace: false,
    defaultTimeoutInterval: 60000
  }
};
