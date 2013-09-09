# grunt-hoodie

[![NPM version](https://badge.fury.io/js/grunt-hoodie.png)](http://badge.fury.io/js/grunt-hoodie) [![Dependency Status](https://gemnasium.com/ro-ka/grunt-hoodie.png)](https://gemnasium.com/ro-ka/grunt-hoodie)

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
        callback: function(stack) {
          // Do something with the stack information from data/stack.json.
          // For example, set the port of grunt-connect-proxy:
          // grunt.config.set('connect.proxies.0.port', stack.www.port);
        }
      }
    }
  },
})
```

### Options

#### options.callback

Type: `Function`
Default value: `function(stack) {}`

A callback that is called when hoodie is up and running. Has one param called `stack` which contains the host and port information from `data/stack.json`

### Usage Example

In this example, the port of [grunt-connect-proxy](https://npmjs.org/package/grunt-connect-proxy) for the `/_api` of hoodie is set after hoodie started.

```js
grunt.initConfig({
  hoodie: {
    start: {
      options: {
        callback: function(stack) {
          grunt.config.set('connect.proxies.0.port', stack.www.port);
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

## Contributing

Take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.1.0 Initial release
