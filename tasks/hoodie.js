/*
 * grunt-hoodie
 * https://github.com/ro-ka/grunt-hoodie
 *
 * Copyright (c) 2013 Robert Katzki
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('hoodie', 'Start hoodie and delay grunting till it is ready.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        callback: function() {}
      }),
      fs = require('fs'),
      path = require('path'),
      exec = require('child_process').exec,
      stackFile = path.resolve('data/stack.json'),
      done = this.async(),
      timerId = 0;

    function setTicker(call, delay) {
      clearTimeout(timerId);
      timerId = setTimeout(call, delay);
    }

    function finish() {
      var data = fs.readFileSync(stackFile, 'utf8'),
        stack = JSON.parse(data);

      options.callback(stack);
      console.log('hoodie is ready!');
      done();
    }

    function checkForStackFile() {
      if (fs.existsSync(stackFile)) {
        finish();
        return;
      }

      setTicker(checkForStackFile, 100);
    }

    console.log('Starting hoodie.');

    // Remove stack file
    if (fs.existsSync(stackFile)) {
      fs.unlinkSync(stackFile);
    }

    var hoodieProcess = exec('hoodie start', function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });

    setTicker(checkForStackFile, 100);
  });

};
