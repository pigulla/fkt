'use strict';

var util = require('util');

var fkt = require('../src/fkt');

module.exports = {
    'catch': function (test) {
        var throwFn = function () {
                throw 'oh noes';
            },
            noThrowFn = function () {
                return 42;
            };

        var caught = fkt.catch(throwFn);
        test.equal(typeof caught, 'function');
        test.doesNotThrow(caught);
        test.strictEqual(caught(), fkt.undefined);

        var uncaught = fkt.catch(noThrowFn);
        test.equal(typeof uncaught, 'function');
        test.doesNotThrow(uncaught);
        test.strictEqual(uncaught(), 42);

        var scope = { x: 13 },
            result =  fkt.catch(function (y) {
                test.strictEqual(this, scope);
                return this.x + y;
            }, scope)(7);

        test.strictEqual(result, 20);
        test.done();
    },

    'bare': function (test) {
        var args = [1, 'a', true],
            result = {},
            invokeArgs,
            invokeResult,
            fn = function () {
                invokeArgs = Array.prototype.slice.call(arguments);
                return result;
            },
            baredFn = fkt.bare(fn);

        invokeResult = fn.apply(null, args);
        test.deepEqual(invokeArgs, args)
        test.strictEqual(invokeResult, result);

        invokeResult = baredFn.apply(null, args);
        test.deepEqual(invokeArgs, [1]);
        test.strictEqual(invokeResult, result);

        test.done();
    },

    'narrow': function (test) {
        var args = [1, 'a', true],
            result = {},
            invokeArgs,
            invokeResult,
            fn = function () {
                invokeArgs = Array.prototype.slice.call(arguments);
                return result;
            },
            narrowedFn = fkt.narrow(2, fn);

        invokeResult = fn.apply(null, args);
        test.deepEqual(invokeArgs, args)
        test.strictEqual(invokeResult, result);

        invokeResult = narrowedFn.apply(null, args);
        test.deepEqual(invokeArgs, [1, 'a']);
        test.strictEqual(invokeResult, result);

        test.done();
    },

    'safe': function (test) {
        var fn = fkt.safe(function (input, callback) {
            if (input === 'failure') {
                callback(new Error('Fail!'));
            } else {
                callback(null, 'yay');
            }
        });

        fn('success', function (error, result) {
            test.strictEqual(error, null);
            test.strictEqual(result, 'yay');
        });

        fn('failure', function (error, result) {
            test.strictEqual(error, null);
            test.strictEqual(result, undefined);
        });

        test.done();
    }
};
