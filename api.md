#fkt/fkt

fkt

##Methods

###noop

A function that does nothing and returns nothing.

Can be used as a default value for callbacks. Saves you a few bytes of memory by not having to create a new
anonymous function every time.

**Returns**: _Undefined_ - 
####Example

    // explicitly specify a "do nothing" function (which creates a new function every time)
    var callback = config.cb || function () {};
    // alternatively, only invoke the callback if defined (fairly verbose)
    if (callback) { callback(someValue); }

    // instead, do this
    var callback = config.cb || fkt.noop;
    // or if it makes you feel fuzzy even
    (callback || noop)(someValue);

###identity

The identity function that always returns its first argument.

**Returns**: _*_ - Returns the input value `x`.

**Params**:  
*   x _*_

    Some value.


###bare

Wraps a function to receive only its first argument.

Can be used to discard unneeded arguments for callbacks, especially when using libraries like async.

**Returns**: _Function_ - Returns the wrapped function.

**Params**:  
*   fn _Function_

    The function to wrap.
*   scope _Object=fkt_

    The scope in which to execute `fn`.

####Example

    // Simplify this:
    async.waterfall([
        function (cb) {
            loadFooBarAndBaz(function (err, foo, bar, baz) {
                // if we pass cb in directly, the next function in the chain would 
                // be called with three unused arguments which we want to avoid
                cb(err);
            });
        }
    ], function (err) {
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

###true

A function that always returns true.

**Returns**: _Boolean_ - Always returns `true`.

###false

A function that always returns false.

**Returns**: _Boolean_ - Always returns `false`.
####Example

    // useful in Backbone.Views when you need to stop event propagation:
    events: {
        'click ul.items li': fkt.false
    }

###negate

A function that wraps the given function and always returns the negated value of it.

One purpose for this is using `Array.filter` with a function that happens to return `false` for values you want
to keep (see the example).

**Returns**: _Function_ - Returns the wrapped function.

**Params**:  
*   fn _Function_

    The function to negate.
*   scope _Object=fkt_

    The scope in which to execute `fn`.

####Example

    // instead of this
    var myArray = someArray.filter(function (el) {
        return !userFunction(el);
    });
   
    // we can do
    var myArray = someArray.filter(fkt.negate(userFunction));

###constant

Creates a function that always returns the specified value.

**Returns**: _Function_ - Returns a function that always returns `c`.

**Params**:  
*   c _*_

    The value you want to be returned.


###catch

Wraps a function so that it never throws an exception. _Don't use this in production code!_

The return value of the wrapped function is the return value of the original function. If an exception was
thrown, a reference to `fkt.undefined` is returned (note that this is _not_ the same as  the value `undefined`).

**Returns**: _Function_ - Returns the wrapped function.

**Params**:  
*   fn _Function_

    The function to wrap.
*   scope _Object=fkt_

    The scope in which to execute `fn`.

####Example

    var result = fkt.catch(someFunction);
    if (result === fkt.undefined) {
        // some exception was thrown
    } else {
        // it's all good
    }

###undefined

A function that always returns undefined.

This is an alias for `fkt.noop()`. You can use whichever makes more sense semantically (i.e.,  makes your code
more readable).

**Returns**: _Undefined_ - Always returns `undefined`.

