# Diner4Two

Diner4two is a datingsite which brings people who like to cook together.  

# Installing packages & using them

## Nodemon

### Installing nodemon via npm

Nodemon helps restarting the node application automatically when file changes in the directory
In your terminal:
```
npm install -g nodemon
```
Nodemon wil be globaly installed in the system path

### Using nodemon

```
nodemon [your node app]
```

## Lodash

### Installing lodash via npm

Lodash is used to simplify your work of managing/editing objects and arrays.

```
$ npm i -g npm
$ npm i --save lodash
```


### Using lodash

In node.js
```javascript
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```
