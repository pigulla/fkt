#fkt


Trivial but occasionally useful functions intended for use as callbacks and in unit tests. Compatible with [Node.js](http://nodejs.org), [requirejs](http://requirejs.org/) and browser environments.


### Installation

Simply do `npm install fkt` (for [Node.js](http://nodejs.org)), `jam install fkt` (for [Jam](http://jamjs.org/)), `bower install fkt` (for [Bower](http://bower.io/)) or just download `fkt.js`.


### API
<a name="module_fkt"></a>
##fkt
**Version**: 0.1.2  
**Author**: Raphael Pigulla <pigulla@four66.com>  

  
**Example**  
```js
var fkt = require("fkt");
```
<a name="module_fkt.undefined"></a>
###fkt.undefined
A function that always returns undefined.

This is an alias for `fkt.noop()`. You can use whichever makes more sense semantically (i.e.,  makes your code
more readable).

**Type**: `function`  
**Since**: 0.1.0  
<a name="module_fkt.noop"></a>
###fkt.noop()
A function that does nothing and returns nothing.

Can be used as a default value for callbacks. Saves you a few bytes of memory by not having to create a new
anonymous function every time.

**Since**: 0.1.0  
**Returns**: `undefined`  
**Example**  
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
<a name="module_fkt.identity"></a>
###fkt.identity(x)
The identity function that always returns its first argument.

**Params**

- x `*` - Some value.

**Since**: 0.1.0  
**Returns**: `*` - Returns the input value `x`.  
<a name="module_fkt.bare"></a>
###fkt.bare(fn, [scope])
Wraps a function to receive only its first argument.

Can be used to discard unneeded arguments for callbacks, especially when using libraries like async.

**Params**

- fn `function` - The function to wrap.
- [scope=fkt] `Object` - The scope in which to execute `fn`.

**Since**: 0.1.2  
**Returns**: `function` - Returns the wrapped function.  
**Example**  
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
<a name="module_fkt.true"></a>
###fkt.true()
A function that always returns true.

**Since**: 0.1.0  
**Returns**: `Boolean` - Always returns `true`.  
<a name="module_fkt.false"></a>
###fkt.false()
A function that always returns false.

**Since**: 0.1.0  
**Returns**: `Boolean` - Always returns `false`.  
**Example**  
```js   
    // useful in Backbone.Views when you need to stop event propagation:
    events: {
        'click ul.items li': fkt.false
    }
<a name="module_fkt.negate"></a>
###fkt.negate(fn, [scope])
A function that wraps the given function and always returns the negated value of it.

One purpose for this is using `Array.filter` with a function that happens to return `false` for values you want
to keep (see the example).

**Params**

- fn `function` - The function to negate.
- [scope=fkt] `Object` - The scope in which to execute `fn`.

**Since**: 0.1.0  
**Returns**: `function` - Returns the wrapped function.  
**Example**  
```js
    // instead of this
    var myArray = someArray.filter(function (el) {
        return !userFunction(el);
    });
   
    // we can do
    var myArray = someArray.filter(fkt.negate(userFunction));
```
<a name="module_fkt.constant"></a>
###fkt.constant(c)
Creates a function that always returns the specified value.

**Params**

- c `*` - The value you want to be returned.

**Since**: 0.1.0  
**Returns**: `function` - Returns a function that always returns `c`.  
<a name="module_fkt.catch"></a>
###fkt.catch(fn, [scope])
Wraps a function so that it never throws an exception. _Don't use this in production code!_

The return value of the wrapped function is the return value of the original function. If an exception was
thrown, a reference to `fkt.undefined` is returned (note that this is _not_ the same as  the value `undefined`).

```js

**Params**

- fn `function` - The function to wrap.
- [scope=fkt] `Object` - The scope in which to execute `fn`.

**Since**: 0.1.0  
**Returns**: `function` - Returns the wrapped function.  
**Example**  
var result = fkt.catch(someFunction);
if (result === fkt.undefined) {
    // some exception was thrown
} else {
    // it's all good
}
```

