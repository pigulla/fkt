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
     * @overview The fkt module.
     * @version 0.1.0
     * @author Raphael Pigulla <pigulla@four66.com>
     */

    /**
     * @exports fkt
     * @type {Object.<string, function>}
     */
    var fkt = {};

    /**
     * A function that does nothing and returns nothing.
     *
     * Can be used as a default value for callbacks. Saves you a few bytes of memory by not having to create a new
     * anonymous function every time.
     *
     * @example
     * // explicitly specify a "do nothing" function (which creates a new function every time)
     * var callback = config.cb || function () {};
     * // alternatively, only invoke the callback if defined (fairly verbose)
     * if (callback) { callback(someValue); }
     *
     * // instead, do this
     * var callback = config.cb || fkt.noop;
     * // or if it makes you feel fuzzy even
     * (callback || noop)(someValue);
     *
     * @returns {undefined}
     */
    fkt.noop = function () {
    };

    /**
     * The identity function that always returns its first argument.
     *
     * @param {*} x Some value.
     * @returns {*} Always returns `x`.
     */
    fkt.identity = function (x) {
        return x;
    };

    /**
     * A function that always returns true.
     *
     * @returns {boolean} Always returns `true`.
     */
    fkt.true = function () {
        return true;
    };

    /**
     * A function that always returns false.
     *
     * @example
     * // useful in Backbone.Views when you need to stop event propagation:
     * events: {
     *     'click ul.items li': fkt.false
     * }
     *
     * @returns {boolean} Always returns `false`.
     */
    fkt.false = function () {
        return false;
    };

    /**
     * A function that wraps the given function ans  always returns the negated value of it.
     *
     * One purpose for this is using `Array.filter` with a function that happens to return `false` for values you want
     * to keep (see the example).
     *
     * @example
     * // instead of this
     * var myArray = someArray.filter(function (el) {
     *     return !userFunction(el);
     * });
     *
     * // we can do
     * var myArray = someArray.filter(fkt.negate(userFunction));
     *
     * @param {function} fn The function to negate.
     * @param {object=} scope The scope in which to execute `fn`.
     * @returns {function} Returns the wrapped function.
     */
    fkt.negate = function (fn, scope) {
        return function () {
            return !fn.apply(scope, arguments);
        };
    };

    /**
     * Creates a function that always returns the specified value.
     *
     * @param {*} c The value you want to be returned.
     * @returns {function} Returns a function that always returns `c`.
     */
    fkt.constant = function (c) {
        return function () {
            return c;
        };
    };

    /**
     * A function that always returns undefined.
     *
     * This is an alias for {@link module:fkt.noop|noop()}. You can use whichever makes more sense semantically (i.e.,
     * makes your code more readable).
     *
     * @type {function}
     * @returns {undefined} Always returns `undefined`.
     */
    fkt.undefined = fkt.noop;

    return fkt;
}));
