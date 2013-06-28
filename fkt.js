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
    /**
     * @overview The fkt module.
     * @version 0.0.1
     * @author Raphael Pigulla <pigulla@four66.com>
     */

    /**
     *
     * @type {Object.<string, function>}
     */
    var fkt = {};

    /**
     * A function that does nothing and returns nothing.
     *
     * Can be used as a default value for callbacks. Saves you a few bytes of memory by not having to create an anonymous
     * function every time.
     *
     * @alias fkt.empty
     * @alias fkt.undefined
     * @alias fkt.nop
     * @returns {undefined}
     */
    fkt.noop = function () {
    };

    /**
     * The identity function that always returns its first argument.
     *
     * @param {*} x
     * @returns {*}
     */
    fkt.identity = function (x) {
        return x;
    };

    /**
     * A function that always returns true.
     *
     * @alias fkt.returnTrue
     * @returns {boolean}
     */
    fkt.yes = function () {
        return true;
    };

    /**
     * A function that always returns false.
     *
     * @alias fkt.returnFalse
     * @returns {boolean}
     */
    fkt.no = function () {
        return false;
    };

    /**
     * A function that always returns the not'ed value of the original function.
     *
     * Useful when using array.filter:
     *   var myArray = someArray.filter(function (el) {
     *       return !userFunction(el);
     *   });
     * becomes
     *   var myArray = someArray.filter(fkt.not(userFunction));
     *
     * @param {function} fn
     * @param {object} scope
     * @returns {function}
     */
    fkt.not = function (fn, scope) {
        return function () {
            return !fn.apply(scope, arguments);
        }
    };

    /**
     * Creates a function that always returns the specified value.
     *
     * @param {*} c
     * @returns {function}
     */
    fkt.constant = function (c) {
        return function () {
            return c;
        };
    };

    // aliases
    fkt.returnFalse = fkt.no;
    fkt.returnTrue = fkt.yes;
    fkt.id = fkt.identity;
    fkt.static = fkt.constant;
    fkt.nop = fkt.empty = fkt.undefined = fkt.noop;

    return fkt;
}));
