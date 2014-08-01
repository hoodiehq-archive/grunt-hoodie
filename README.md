# grunt-hoodie
[![Build Status](https://travis-ci.org/hoodiehq/grunt-hoodie.svg)](https://travis-ci.org/hoodiehq/grunt-hoodie)
[![NPM version](https://badge.fury.io/js/grunt-hoodie.svg)](http://badge.fury.io/js/grunt-hoodie)
[![Dependency Status](https://david-dm.org/hoodiehq/grunt-hoodie.svg)](https://david-dm.org/hoodiehq/grunt-hoodie)
[![devDependency Status](https://david-dm.org/hoodiehq/grunt-hoodie/dev-status.svg)](https://david-dm.org/hoodiehq/grunt-hoodie#info=devDependencies)

> Start hoodie and delay grunting till it is ready. Triggers a callback with hosts and ports of couchDB, www and pocket.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hoodie --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hoodie');
```

## The "hoodie" task

### Overview
In your project's Gruntfile, add a section named `hoodie` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hoodie: {
    start: {
      options: {
        callback: function (config) {
          // For example, set the port of grunt-connect-proxy:
          // grunt.config.set('connect.proxies.0.port', config.stack.www.port);
        }
      }
    },
    stop: {}
  },
});

// Imagine you have a task `e2e` that runs end to end tests and needs hoodie
// server to be running.
grunt.registerTask('run_e2e', [ 'hoodie:start', 'e2e', 'hoodie:stop' ]);
```

So you can:

```
$ grunt run_e2e
```

### Options

#### options.callback

Type: `Function`
Default value: `function(config) {}`

A callback that is called when hoodie is up and running. Has one param called `config` which contains the host and port information.

#### options.childProcessOptions

Type: `Object`
Default value: `{silent: true}`

Allows to pass options to the childProcess.fork where hoodie runs.

```js
hoodie: {
  start: {
    options: {
      childProcessOptions: {
        cwd: process.cwd() + '/myapp',
        env: env
      }
    }
  },
  stop: {}
}
```

### Usage Example

In this example, the port of [grunt-connect-proxy](https://npmjs.org/package/grunt-connect-proxy) for the `/_api` of hoodie is set after hoodie started.

```js
grunt.initConfig({
  hoodie: {
    start: {
      options: {
        callback: function(config) {
          grunt.config.set('connect.proxies.0.port', config.stack.www.port);
        }
      }
    }
  },
  connect: {
    options: {
      port: 9000,
      hostname: 'localhost'
    },
    proxies: [
      {
        context: '/_api',
        host: 'localhost',
        port: false,
        https: false,
        changeOrigin: false
      }
    ],
    …
  },
})
```

In this other example we start the hoodie server, send an HTTP request to get
the combined javascript and put it in a file. This can be useful as part of a
build process.

```js
grunt.initConfig({
  hoodie: {
    start: {
      options: {
        callback: function (config) {
          grunt.config.set('hoodiejs.options.port', config.stack.www.port);
        }
      }
    },
    stop: {}
  },
});

grunt.registerTask('hoodiejs', function () {
  // Dependens on successful execution of hoodie:start. Note that
  // grunt.task.requires won't actually RUN the other task(s). It'll just check
  // to see that it has run and not failed.
  grunt.task.requires('hoodie:start');

  var done = this.async();
  var options = this.options();
  var url = 'http://localhost:' + options.port + '/_api/_files/hoodie.js';
  http.get(url, function (res) {
    var fname = path.join(__dirname, 'some/path/hoodie.js');
    res.pipe(fs.createWriteStream(fname)).on('finish', function () {
      done();
    });
  }).on('error', function (err) {
    grunt.log.error(err);
    done(false);
  });
});
```

So you should now be able to run:

```
$ grunt hoodie:start hoodiejs
```

## Contributing

Take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
