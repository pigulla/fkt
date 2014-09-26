

<!-- Start src/fkt.js -->

# fkt

Author: Raphael Pigulla <pigulla@four66.com>

Version: 0.1.3

A collection of trivial but occasionally useful functions intended for use as callbacks and in unit tests.
Compatible with [Node.js](http://nodejs.org), [requirejs](http://requirejs.org/) and browser environments.

### Installation

Simply do:
```
npm install fkt    // for [Node.js](http://nodejs.org)
jam install fkt    // for [Jam](http://jamjs.org/)
bower install fkt  // for [Bower](http://bower.io/
```
or just [download directly](https://raw.githubusercontent.com/pigulla/fkt/master/src/fkt.js) from GitHub

## API

- [bare(fn, scope)](#barefn-scope)
- [catch(fn, scope)](#catchfn-scope)
- [constant(c)](#constantc)
- [false()](#false)
- [identity(x)](#identityx)
- [narrow(n, fn, scope)](#narrown-fn-scope)
- [negate(fn, scope)](#negatefn-scope)
- [noop()](#noop)
- [safe(fn, scope)](#safefn-scope)
- [true()](#true)
- [undefined()](#undefined)

## noop()

A function that does nothing and returns nothing.

Can be used as a default value for callbacks. Saves you a few bytes of memory by not having to create a new
anonymous function every time.

```js
// explicitly specify a "do nothing" function (which creates a new function every time)
var callback = config.cb || function () {};
// alternatively, only invoke the callback if defined (fairly verbose)
if (callback) { callback(someValue); }

// instead, do this
var callback = config.cb || fkt.noop;
// or if it makes you feel fuzzy even
(callback || noop)(someValue);
```

### Return:

* **undefined** 

## identity(x)

The identity function that always returns its first argument.

### Params: 

* **mixed** *x* 

### Return:

* **mixed** Returns the input value `x`.

## bare(fn, scope)

Wraps a function to receive only its first argument.

Can be used to discard unneeded arguments for callbacks, especially when using libraries like
[async](https://www.npmjs.org/package/async).

```js
// Simplify this:
async.waterfall([
    function (cb) {
        loadFooBarAndBaz(function (err, foo, bar, baz) {
            // if we pass cb in directly, the next function in the chain would
            // be called with three unused arguments which we want to avoid
            cb(err);
        });
    }
], function (cb) {
    // ...
});

// to this:
async.waterfall[
    function (cb) {
        loadFooBarAndBaz(fkt.bare(cb));
    }
], function (err) {
    // ...
});
```

### Params: 

* **function** *fn* The function to wrap.
* **Object** *scope* The scope in which to execute `fn`.

### Return:

* **function** Returns the wrapped function.

## narrow(n, fn, scope)

Wraps a callback to only be invoked with its first `n` arguments.

```
var narrowed = fkt.narrow(2, function () {
    console.dir(arguments);
});
narrowed(1, 2, 3, 4);  // outputs [1, 2]
```

### Params: 

* **number** *n* The number of parameters to keep.
* **function** *fn* The function to wrap.
* **Object=** *scope* The scope in which to execute `fn`.

### Return:

* **function** Returns the wrapped function.

## safe(fn, scope)

Wraps a callback to always be invoked without an error.

Can be used to "swallow" errors if you know that it is safe to ignore them, which may be helpful when using
libraries like async (e.g., async.map() will immediately abort when it encounters the first error which may
not be what you want).

```js
fs.readFile('log.txt', fkt.safe(function (err, data) {
    // err is guaranteed to be null
}));
```

### Params: 

* **function** *fn* The function to wrap.
* **Object** *scope* The scope in which to execute `fn`.

### Return:

* **function** Returns the wrapped function.

## true()

A function that always returns `true`.

### Return:

* **boolean** Always returns `true`.

## false()

A function that always returns `false`.

```js
// useful in Backbone.Views when you need to stop event propagation:
events: {
    'click ul.items li': fkt.false
}
```

### Return:

* **boolean** Always returns `false`.

## negate(fn, scope)

A function that wraps the given function and always returns the negated value of it.

One purpose for this is using `Array.filter` with a function that happens to return `false` for values you want
to keep (see the example).

```js
// instead of this
var myArray = someArray.filter(function (el) {
    return !userFunction(el);
});
     * // we can do
var myArray = someArray.filter(fkt.negate(userFunction));
```

### Params: 

* **function** *fn* The function to negate.
* **Object** *scope* The scope in which to execute `fn`.

### Return:

* **function** Returns the wrapped function.

## constant(c)

Creates a function that always returns the specified value.

### Params: 

* **mixed** *c* The value you want to be returned.

### Return:

* **function** Returns a function that always returns `c`.

## catch(fn, scope)

Wraps a function so that it never throws an exception. _Don't use this in production code!_

The return value of the wrapped function is the return value of the original function. If an exception was
thrown, a reference to `fkt.undefined` is returned (note that this is _not_ the same as  the value `undefined`).

```js
var result = fkt.catch(someFunction);
if (result === fkt.undefined) {
    // some exception was thrown
} else {
    // it's all good
}
```

### Params: 

* **function** *fn* The function to wrap.
* **Object** *scope* The scope in which to execute `fn`.

### Return:

* **function** Returns the wrapped function.

## undefined()

A function that always returns `undefined`.

This is an alias for `fkt.noop()`. You can use whichever makes more sense semantically (i.e.,  makes your code
more readable).

### Return:

* **undefined** 

<!-- End src/fkt.js -->

