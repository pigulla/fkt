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
     * fkt
     *
     * @module fkt
     * @class fkt
     * @static
     * @version 0.1.2
     * @author Raphael Pigulla <pigulla@four66.com>
     */
    var fkt = {};

    /**
     * A function that does nothing and returns nothing.
     *
     * Can be used as a default value for callbacks. Saves you a few bytes of memory by not having to create a new
     * anonymous function every time.
     *
     * @example
     *     // explicitly specify a "do nothing" function (which creates a new function every time)
     *     var callback = config.cb || function () {};
     *     // alternatively, only invoke the callback if defined (fairly verbose)
     *     if (callback) { callback(someValue); }
     *
     *     // instead, do this
     *     var callback = config.cb || fkt.noop;
     *     // or if it makes you feel fuzzy even
     *     (callback || noop)(someValue);
     *
     * @method noop
     * @since 0.1.0
     * @return {undefined}
     */
    fkt.noop = function () {
    };

    /**
     * The identity function that always returns its first argument.
     * 
     * @method identity
     * @since 0.1.0
     * @param {*} x Some value.
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
     *
     * @method bare
     * @since 0.1.2
     * @param {Function} fn The function to wrap.
     * @param {Object=fkt} scope The scope in which to execute `fn`.
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
     * @method true
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
     *     // useful in Backbone.Views when you need to stop event propagation:
     *     events: {
     *         'click ul.items li': fkt.false
     *     }
     *
     * @method false
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
     *     // instead of this
     *     var myArray = someArray.filter(function (el) {
     *         return !userFunction(el);
     *     });
     *    
     *     // we can do
     *     var myArray = someArray.filter(fkt.negate(userFunction));
     *
     * @method negate
     * @since 0.1.0
     * @param {Function} fn The function to negate.
     * @param {Object=fkt} scope The scope in which to execute `fn`.
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
     * @method constant
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
     * @example
     *     var result = fkt.catch(someFunction);
     *     if (result === fkt.undefined) {
     *         // some exception was thrown
     *     } else {
     *         // it's all good
     *     }
     * 
     * @method catch
     * @since 0.1.0
     * @param {Function} fn The function to wrap.
     * @param {Object=fkt} scope The scope in which to execute `fn`.
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
     * @method undefined
     * @since 0.1.0
     * @type {Function}
     * @return {undefined} Always returns `undefined`.
     */
    fkt.undefined = fkt.noop;

    return fkt;
}));
