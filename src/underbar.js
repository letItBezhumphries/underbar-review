(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : n >= array.length ? array.slice() : array.slice(array.length - n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (let key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {  
    var output = [];
    _.each(collection, function(value) {
      if (test(value)) {
        output.push(value);
      }
    });
    return output;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item) {
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    let unique = [];
    let transformedUnique = [];
    if (arguments.length < 3) {
      _.each(array, function(element, index) {
        if (!unique.includes(element)) {
          unique.push(element);
        }
      });
    } else if (arguments.length === 3 && isSorted) {
      for (let i = 0; i < array.length; i++) {
        if (!transformedUnique.includes(iterator(array[i]))) {
          transformedUnique.push(iterator(array[i]));
          unique.push(array[i]);
        }
      }
    }
    return unique; 
  };


  // Return the results of applying an iterator to each element.
  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.
  _.map = function(collection, iterator) {
    let output = [];
    _.each(collection, function(item, index) {
      output.push(iterator(item));
    });
    return output;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    _.each(collection, function(item, index, collection) {
      if (accumulator === undefined && index === 0) {
        accumulator = collection[0];
      } else {
        accumulator = iterator(accumulator, item);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    if (collection.length === 0) {
      return true;
    }
    return _.reduce(collection, function(isTrue, item) {
      return isTrue && !!(iterator(item));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (collection.length === 0) {
      return false;
    }
    iterator = iterator || _.identity;
    return !(_.every(collection, function(item) {
      return !iterator(item);
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    //loop over the arguments starting from the index 1
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    //loop over the arguments starting from the index 1
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        if (obj[key] === undefined) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  /*
  //create a cache object to store invocations of func()
    //return a function
    //create a key to store JSONified func/arguments
    //check if the key doesn't exist on cache, if it doesn't
      //add the key to cache and set it equal to the results of invoking func with arguments
  //return the existing key value pair from cache
  */
  _.memoize = function(func) {
    let cache = {};
    return function() {
      let key = JSON.stringify(arguments);
      if (!cache[key]) {  
        cache[key] = func.apply(this, arguments);
      } 
      return cache[key];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //transform arguments into an array
    
    let args = Array.prototype.slice.call(arguments);
    //create a variable to store call time arguments/ arguments after the wait parameter  
        
    let restArgs = args.slice(2);
    //call setTimeout passing in an anonymous function that invokes func passing in the restArgs
        
    setTimeout(function() { func.apply(null, restArgs); }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //create a clone of the array
    let clone = array.slice();
    //create a variable to store clone.length
    let length = clone.length;
    //initialize but don't declare 
    let temp, idx;
    //as long as there is length while loop over the clone
    while (length > 0) {
      //set idx to a random number from the length
      idx = Math.floor(Math.random() * --length);
      //set the temp variable to equal clone at the index of length
      temp = clone[length];
      clone[length] = clone[idx];
      clone[idx] = temp;
    }
    return clone;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {  
    return _.map(collection, function(item) {    
      //check if typeof functionOrKey is a function
      if (typeof functionOrKey === 'function') {
        return functionOrKey.apply(item, args);
      } else {
        return item[functionOrKey]();
      }
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    let clone = collection.slice();
    //check if the iterator is a function
    if (typeof iterator === 'function') {
      return clone.sort(function(a, b) {
        if (iterator(a) !== iterator(b)) {
          if (iterator(a) > iterator(b) || iterator(a) === undefined) {
            return 1;
          }
          if (iterator(a) < iterator(b) || iterator(b) === undefined) {
            return -1;
          }
        }
        return iterator(a) - iterator(b);
      });
    }  
    //check if the iterator is a string
    if (typeof iterator === 'string') {
      return clone.sort(function(a, b) {
        if (a[iterator] !== b[iterator]) {
          if (a[iterator] > b[iterator] || a[iterator] === undefined) {
            return 1;
          }
          if (a[iterator] < b[iterator] || b[iterator] === undefined) {
            return -1;
          }
        }
        return a[iterator] - b[iterator];
      });
    }  
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    //create a variable to store all the arrays
    var args = Array.prototype.slice.call(arguments);

    //create an array that will store the width of matrix and the column indexes
    let columnIdx = Object.keys(args[0]);
    
    //iterating over each column in the matrix
    //map items for each column index into an array
    return _.map(columnIdx, function(item) {
      //iterating over each row in the matrix
      return _.map(args, function(arr) {
        //return the row [column] mapped according to the columnIdx
        return arr[item]; 
      });
    });
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = [];
    //iterate over each element in nestedArray
    for (let i = 0; i < nestedArray.length; i++) {
      //check if the element is not an object
      if (typeof nestedArray[i] !== 'object') {
        result.push(nestedArray[i]);
      }
      //check if the element is an array
      if (Array.isArray(nestedArray[i])) {
        result = result.concat(_.flatten(nestedArray[i]));
      }
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  //create an array to store shared items
  //create an array of the arguments
  //iterate over each value in first array
  //iterate over each array in args
  //check if value exists in the current array
  //if it does increment count
  //if the count total equals args.length push the element into shared
  //and set count back to zero

  _.intersection = function() {
    let shared = [];
    let args = Array.prototype.slice.call(arguments);
    
    _.each(args[0], function(value, index) {  
      let count = 0;

      for (let i = 0; i < args.length; i++) { 
        if (args[i].includes(value)) {
          count = count + 1;  
        }
        if (count === args.length) {
          shared.push(value);
          count = 0;
        }
      }
    });
    return shared;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    let different = [];
    let args = Array.prototype.slice.call(arguments);
    let others = args.slice(1);
  
    _.each(args[0], function(value, index) {
      let count = 0;
    
      for (let i = 0; i < others.length; i++) {
        if (!others[i].includes(value)) {
          count = count + 1;
        }
        if (count === others.length) {
          different.push(value);
          count = 0;
        }
      }
    });
    return different;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  
    //return function() {
    //create a variable that stores boolean relating to whether its already been called once
  };


}
());
