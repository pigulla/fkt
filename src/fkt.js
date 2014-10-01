/**
 * # fkt
 *
 * @version 0.1.4
 * @author Raphael Pigulla <pigulla@four66.com>
 * @license WTFPL
 */

/**
 * A collection of very simple but occasionally useful functions, primarily intended for use with (and as) callbacks and
 * in unit tests..
 *
 * Runs in both [Node.js](http://nodejs.org) and the browser. Available on
 * [npm](https://www.npmjs.org/package/fkt), [Jam](https://www.npmjs.org/package/fkt) and [Bower](http://bower.io/).
 * Implements the [UMD](https://github.com/umdjs/umd) pattern for compatibility with both native browsers environments
 * and AMD loaders such as [requirejs](http://requirejs.org/).
 *
 * ### Installation
 *
 * Simply do one of the following:
 * ```
 * npm install fkt
 * jam install fkt
 * bower install fkt
 * ```
 * or just [download directly](https://raw.githubusercontent.com/pigulla/fkt/master/src/fkt.js) from GitHub.
 *
 * ## API
 *
 *  - [bare(fn, scope)](#barefn-scope)
 *  - [catch(fn, scope)](#catchfn-scope)
 *  - [constant(c)](#constantc)
 *  - [false()](#false)
 *  - [identity(x)](#identityx)
 *  - [narrow(n, fn, scope)](#narrown-fn-scope)
 *  - [negate(fn, scope)](#negatefn-scope)
 *  - [noop()](#noop)
 *  - [safe(fn, scope)](#safefn-scope)
 *  - [true()](#true)
 *  - [undefined()](#undefined)
 */

(function (root, factory) {
    'use strict';

    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.fkt = factory();
    }
}(this, function () {
    'use strict';

    var fkt = {};

    /**
     * Wraps a function to receive only its first argument.
     *
     * Can be used to discard unneeded arguments for callbacks, especially when using libraries like
     * [async](https://www.npmjs.org/package/async).
     *
     * ```js
     * // Simplify this:
     * async.waterfall([
     *     function (cb) {
     *         loadFooBarAndBaz(function (err, foo, bar, baz) {
     *             // if we pass cb in directly, the next function in the chain would
     *             // be called with three unused arguments which we want to avoid
     *             cb(err);
     *         });
     *     }
     * ], function (cb) {
     *     // ...
     * });
     *
     * // to this:
     * async.waterfall[
     *     function (cb) {
     *         loadFooBarAndBaz(fkt.bare(cb));
     *     }
     * ], function (err) {
     *     // ...
     * });
     * ```
     *
     * @since 0.1.2
     * @param {function} fn The function to wrap.
     * @param {Object=} scope The scope in which to execute `fn`.
     * @return {function} Returns the wrapped function.
     */
    fkt.bare = function (fn, scope) {
        return fkt.narrow(1, fn, scope);
    };

    /**
     * Wraps a function so that it never throws an exception. _Don't use this in production code!_
     *
     * The return value of the wrapped function is the return value of the original function. If an exception was
     * thrown, a reference to `fkt.undefined` is returned (note that this is _not_ the same as  the value `undefined`).
     *
     * ```js
     * var result = fkt.catch(someFunction);
     * if (result === fkt.undefined) {
     *     // some exception was thrown
     * } else {
     *     // it's all good
     * }
     * ```
     *
     * @since 0.1.0
     * @param {function} fn The function to wrap.
     * @param {Object=} scope The scope in which to execute `fn`.
     * @return {function} Returns the wrapped function.
     */
    fkt.catch = function (fn, scope) {
        return function () {
            try {
                return fn.apply(scope || this, arguments);
            } catch (e) {
                return fkt.undefined;
            }
        };
    };

    /**
     * Creates a function that always returns the specified value.
     *
     * @since 0.1.0
     * @param {mixed} c The value you want to be returned.
     * @return {function} Returns a function that always returns `c`.
     */
    fkt.constant = function (c) {
        return function () {
            return c;
        };
    };

    /**
     * A function that always returns `false`.
     *
     * ```js
     * // useful in Backbone.Views when you need to stop event propagation:
     * events: {
     *     'click ul.items li': fkt.false
     * }
     * ```
     *
     * @since 0.1.0
     * @return {boolean} Always returns `false`.
     */
    fkt.false = function () {
        return false;
    };

    /**
     * The identity function that always returns its first argument.
     *
     * @since 0.1.0
     * @param {mixed} x
     * @return {mixed} Returns the input value `x`.
     */
    fkt.identity = function (x) {
        return x;
    };

    /**
     * Wraps a callback to only be invoked with its first `n` arguments.
     *
     * ```
     * var narrowed = fkt.narrow(2, function () {
     *     console.dir(arguments);
     * });
     * narrowed(1, 2, 3, 4);  // outputs [1, 2]
     * ```
     *
     * @since 0.1.3
     * @param {number} n The number of parameters to keep.
     * @param {function} fn The function to wrap.
     * @param {Object=} scope The scope in which to execute `fn`.
     * @return {function} Returns the wrapped function.
     */
    fkt.narrow = function (n, fn, scope) {
        return function (x) {
            var args = Array.prototype.splice.call(arguments, 0, n);
            return fn.apply(scope, args);
        };
    };

    /**
     * A function that wraps the given function and always returns the negated value of it.
     *
     * One purpose for this is using `Array.filter` with a function that happens to return `false` for values you want
     * to keep (see the example).
     *
     * ```js
     * // instead of this
     * var myArray = someArray.filter(function (el) {
     *     return !userFunction(el);
     * });
     * // we can do
     * var myArray = someArray.filter(fkt.negate(userFunction));
     * ```
     *
     * @since 0.1.0
     * @param {function} fn The function to negate.
     * @param {Object=} scope The scope in which to execute `fn`.
     * @return {function} Returns the wrapped function.
     */
    fkt.negate = function (fn, scope) {
        return function () {
            return !fn.apply(scope, arguments);
        };
    };

    /**
     * A function that does nothing and returns nothing.
     *
     * Can be used as a default value for callbacks. Saves you a few bytes of memory by not having to create a new
     * anonymous function every time.
     *
     * ```js
     * // explicitly specify a "do nothing" function (which creates a new function every time)
     * var callback = config.cb || function () {};
     * // alternatively, only invoke the callback if defined (fairly verbose)
     * if (callback) { callback(someValue); }
     *
     * // instead, do this
     * var callback = config.cb || fkt.noop;
     * // or if it makes you feel fuzzy even
     * (callback || fkt.noop)(someValue);
     * ```
     * @since 0.1.0
     * @return {undefined}
     */
    fkt.noop = function () {
    };

    /**
     * Wraps a callback to always be invoked with `null` as its first argument (i.e., it will never fail).
     *
     * Can be used to "swallow" errors if you know that it is safe to ignore them, which may be helpful when using
     * libraries like [async](https://www.npmjs.org/package/async) (e.g., async.map() will immediately abort when it
     * encounters the first error which may not be what you want).
     *
     * ```js
     * // assuming file2 doesn't exist
     * async.map(['file1', 'file2', 'file3'], fkt.safe(fs.readFile), function (error, result) {
     *     // error is guaranteed to be null
     *     // result is [<buffer>, undefined, <buffer>]
     * }));
     * ```
     *
     * @since 0.1.3
     * @param {function} fn The function to wrap.
     * @param {Object=} scope The scope in which to execute `fn`.
     * @return {function} Returns the wrapped function.
     */
    fkt.safe = function (fn, scope) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1),
                callback = arguments[arguments.length - 1];

            fn.apply(scope, args.concat(function () {
                var cbArgs = Array.prototype.slice.call(arguments, 1);
                callback.apply(null, Array.prototype.concat.apply([null], cbArgs));
            }));
        };
    };

    /**
     * A function that always returns `true`.
     *
     * ```js
     * function getCars(tickets, filterFn) {
     *     return cars.filter(filterFn || fkt.true);
     * }
     *
     * getCars();  // get all cars
     * getCars(function (car) { return car.color === 'red'; });  // get red cars only
     * ```
     *
     * @since 0.1.0
     * @return {boolean} Always returns `true`.
     */
    fkt.true = function () {
        return true;
    };

    /**
     * A function that always returns `undefined`.
     *
     * This is an alias for `fkt.noop()`. You can use whichever makes more sense semantically (i.e.,  makes your code
     * more readable).
     *
     * @since 0.1.0
     * @type {function}
     * @method undefined
     * @return {undefined}
     */
    fkt.undefined = fkt.noop;

    return fkt;
}));
