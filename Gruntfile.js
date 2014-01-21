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
          callback: function(stack) {
            // Do something with the stack information from data/stack.json.
            // For example, set the port of grunt-connect-proxy:
            // grunt.config.set('connect.proxies.0.port', stack.www.port);
          }
        }
      }
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);
};
