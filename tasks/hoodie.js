/*
 * grunt-hoodie
 * https://github.com/ro-ka/grunt-hoodie
 *
 * Copyright (c) 2013 Robert Katzki
 * Licensed under the MIT license.
 */

var fs = require('fs'),
  path = require('path'),
  fork = require('child_process').fork;

module.exports = function(grunt) {

  'use strict';

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var servers = [];

  grunt.registerMultiTask('hoodie', 'Start hoodie and delay grunting till it is ready.', function () {
    var options = this.options({
        callback: function() {}
      }),
      done = this.async();

    var args = [];
    if (options.www) {
      args = ['--www', options.www];
    }

    var bin = path.resolve('node_modules/hoodie-server/bin/start');
    var child = fork(bin, args);

    child.on('message', function (msg) {
      options.callback(msg);
      console.log('hoodie is ready!');
      done();
    });

    // keep a reference so we can kill it
    servers.push(child);

  });

  grunt.registerTask('hoodie_stop', 'Stop all hoodie servers.', function () {
    servers.forEach(function (server) {
      server.kill();
    });
  });

  grunt.registerTask('hoodie_start', ['hoodie']);

};
