'use strict';

var nodeunit = require('nodeunit');

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

        var scope = { x: 13 };
        fkt.catch(function () {
            test.strictEqual(this, scope);
        }, scope)();

        test.done();
    }
};