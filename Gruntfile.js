/*
 * grunt-hoodie
 * https://github.com/ro-ka/grunt-hoodie
 *
 * Copyright (c) 2013 Robert Katzki
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      }
    },
    hoodie: {
      start: {
        options: {
          callback: function(config) {
            grunt.config.set('connect.proxies.0.port', config.stack.www.port);
          }
        }
      }
    },
    release: {
      options: {
        bump: {
          files: ['package.json'],
          commitFiles: ['package.json', 'CHANGELOG.md']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-release-hoodie');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('ci', ['default', 'integration-test']);
};
