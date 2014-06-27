/**
 * @module fkt
 * @version 0.1.2
 * @author Raphael Pigulla <pigulla@four66.com>
 * @example
 * ```js
 * var fkt = require("fkt");
 * ```
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

    /**
    @alias module:fkt
    */
    var fkt = {};

    /**
     * A function that does nothing and returns nothing.
     *
     * Can be used as a default value for callbacks. Saves you a few bytes of memory by not having to create a new
     * anonymous function every time.
     *
     * @example
     * ```js    
     *     // explicitly specify a "do nothing" function (which creates a new function every time)
     *     var callback = config.cb || function () {};
     *     // alternatively, only invoke the callback if defined (fairly verbose)
     *     if (callback) { callback(someValue); }
     *
     *     // instead, do this
     *     var callback = config.cb || fkt.noop;
     *     // or if it makes you feel fuzzy even
     *     (callback || noop)(someValue);
     * ```
     * @since 0.1.0
     * @return {undefined}
     */
    fkt.noop = function () {
    };

    /**
     * The identity function that always returns its first argument.
     * 
     * @since 0.1.0
     * @param {*} - Some value.
     * @return {*} Returns the input value `x`.
     */
    fkt.identity = function (x) {
        return x;
    };

    /**
     * Wraps a function to receive only its first argument.
     *
     * Can be used to discard unneeded arguments for callbacks, especially when using libraries like async.
     *
     * @example
     * ```js
     *     // Simplify this:
     *     async.waterfall([
     *         function (cb) {
     *             loadFooBarAndBaz(function (err, foo, bar, baz) {
     *                 // if we pass cb in directly, the next function in the chain would 
     *                 // be called with three unused arguments which we want to avoid
     *                 cb(err);
     *             });
     *         }
     *     ], function (cb) {
     *         // ...
     *     });
     *     
     *     // to this:
     *     async.waterfall[
     *         function (cb) {
     *             loadFooBarAndBaz(fkt.bare(cb));
     *         }
     *     ], function (err) {
     *         // ...
     *     });
     * ```
     * @since 0.1.2
     * @param {Function} - The function to wrap.
     * @param [scope=fkt] {Object} - The scope in which to execute `fn`.
     * @return {Function} Returns the wrapped function.
     */
    fkt.bare = function (fn, scope) {
        return function (x) {
            fn.call(scope || this, x);
        };
    };

    /**
     * A function that always returns true.
     *
     * @since 0.1.0
     * @return {Boolean} Always returns `true`.
     */
    fkt.true = function () {
        return true;
    };

    /**
     * A function that always returns false.
     *
     * @example
     * ```js   
     *     // useful in Backbone.Views when you need to stop event propagation:
     *     events: {
     *         'click ul.items li': fkt.false
     *     }
     *
     * @since 0.1.0
     * @return {Boolean} Always returns `false`.
     */
    fkt.false = function () {
        return false;
    };

    /**
     * A function that wraps the given function and always returns the negated value of it.
     *
     * One purpose for this is using `Array.filter` with a function that happens to return `false` for values you want
     * to keep (see the example).
     *
     * @example
     * ```js
     *     // instead of this
     *     var myArray = someArray.filter(function (el) {
     *         return !userFunction(el);
     *     });
     *    
     *     // we can do
     *     var myArray = someArray.filter(fkt.negate(userFunction));
     * ```
     * @since 0.1.0
     * @param {Function} fn The function to negate.
     * @param [scope=fkt] {Object} - The scope in which to execute `fn`.
     * @return {Function} Returns the wrapped function.
     */
    fkt.negate = function (fn, scope) {
        return function () {
            return !fn.apply(scope || this, arguments);
        };
    };

    /**
     * Creates a function that always returns the specified value.
     *
     * @since 0.1.0
     * @param {*} c The value you want to be returned.
     * @return {Function} Returns a function that always returns `c`.
     */
    fkt.constant = function (c) {
        return function () {
            return c;
        };
    };

    /**
     * Wraps a function so that it never throws an exception. _Don't use this in production code!_
     *
     * The return value of the wrapped function is the return value of the original function. If an exception was
     * thrown, a reference to `fkt.undefined` is returned (note that this is _not_ the same as  the value `undefined`).
     *
     * ```js
     * @example
     *     var result = fkt.catch(someFunction);
     *     if (result === fkt.undefined) {
     *         // some exception was thrown
     *     } else {
     *         // it's all good
     *     }
     * ```
     * @since 0.1.0
     * @param {Function} - The function to wrap.
     * @param [scope=fkt] {Object} - The scope in which to execute `fn`.
     * @return {Function} Returns the wrapped function.
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
     * A function that always returns undefined.
     *
     * This is an alias for `fkt.noop()`. You can use whichever makes more sense semantically (i.e.,  makes your code
     * more readable).
     *
     * @since 0.1.0
     * @type {Function}
     * @return {undefined} Always returns `undefined`.
     */
    fkt.undefined = fkt.noop;

    return fkt;
}));
