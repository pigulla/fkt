'use strict';

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
    }
};