'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['Gruntfile.js','www/js/**/*.js'],
        tasks: ['jshint:all','test'],
        options: {
          livereload: true
        }
      },
      e2e: {
        files: ['www/js/**/*.js'],
        tasks: ['protractor'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
      },
      all: ['Gruntfile.js','www/js/**/*.js',],
     
    },
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n'
    //   },
    //   build: {
    //     src: 'www/js/controllers/*.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // },

    // =Testing
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: false,
      }
    },
    protractor: {
      options: {
          configFile: 'node_modules/protractor/referenceConf.js', // Default config file
          keepAlive: true, // If false, the grunt process stops when the test fails.
          noColor: false, // If true, protractor will not use colors in its output.
          args: {
            // Arguments passed to the command
          }
        },
        yourTarget: {
          options: {
            configFile: 'protractor.conf.js', // Target-specific config file
            args: {} // Target-specific arguments
          }
        },
      },
      
      scaffold: {
        angular: {
          options: {
            questions: [{
              name: 'name',
              type: 'input',
              message: 'angular module name:'
            }],
            template: {
              'boilerplates/angular_module/boilerplate.ctrl.js': 'www/js/modules/{{name}}/{{name}}.ctrl.js',
              'boilerplates/angular_module/boilerplate.ctrl.spec.js': 'www/js/modules/{{name}}/{{name}}.ctrl.spec.js',
              'boilerplates/angular_module/boilerplate.e2e.js': 'www/js/modules/{{name}}/{{name}}.e2e.js',
              'boilerplates/angular_module/boilerplate.html': 'www/js/modules/{{name}}/{{name}}.html',
              'boilerplates/angular_module/index.js': 'www/js/modules/{{name}}/index.js',
              'boilerplates/angular_module/module.js': 'www/js/modules/{{name}}/module.js'
            }
          }
        },
        iplatform: {
          options: {
            questions: [{
              name: 'name',
              type: 'input',
              message: 'iplatform module name:'
            }],
            template: {
              'boilerplates/ip_module/boilerplate.js': 'www/js/iplatform/{{name}}/{{name}}.js',
              'boilerplates/ip_module/boilerplate.spec.js': 'www/js/iplatform/{{name}}/{{name}}.spec.js',
            }
          }
        }
      },
      express: {
        server: {
          options: {
            port: 9000,
            bases: 'www',
            debug:true,
            server:'./server.js'
          }
        }
      }
    });

  // Load the plugin that provides the 'uglify' task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-phantom');
  grunt.loadNpmTasks('grunt-scaffold');
  grunt.loadNpmTasks('grunt-express');
  // Default task(s).
  grunt.registerTask('default', ['watch:js']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('e2e', ['protractor']);
  grunt.registerTask('myServer', ['express', 'express-keepalive']);
};