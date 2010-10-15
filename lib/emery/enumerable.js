var module = require('./module').module;

exports.Enumerable = Enumerable = module( {
  all: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  any: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  /**
   * Invokes block once for each element of self. Creates a new array containing 
   * the values returned by the block.
   */
  map: function( callback ) {
    var ret = []
    for( i in this.__data__ ) {
      ret.push( callback(this.__data__[i]) )
    }
    return( new Array(ret) )
  },
  collect: function(callback) {
    return( this.map(callback) )
  },
  
  /**
   * Returns the number of elements. If an argument is given, counts the number of 
   * elements which equals to obj. If a block is given, counts the number of elements yielding 
   * a true value.
   */
  count: function(n) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  /**
   * Calls block for each element repeatedly n times or forever if none or nil is given. If a 
   * non-positive number is given or the array is empty, does nothing. Returns nil if the loop has 
   * finished without getting interrupted.
   */
  cycle: function(n ,callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  /**
   * Drops first n elements from ary, and returns rest elements in an array.
   */
  drop: function(n) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  /**
   * Drops elements up to, but not including, the first element for which the block returns nil or 
   * false and returns an array containing the remaining elements.
   */
  drop_while: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  each_slice: function(n ,callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  each_cons: function(n, callback) {
    
  },
  
  each_with_index: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  each_with_object: function(obj, callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  find: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  find_all: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  find_index: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  grep: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  group_by: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  /**
   * Returns true if the given object is present in self (that is, if any object == anObject), 
   * false otherwise.
   */
  include: function(e) {
    var ret = false
    this.each( function(f) {
      if( f == e ) { ret = true }
    })
    return( ret )
  },
  
  inject: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  max: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  max_by: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  min: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  min_by: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  minman: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  minmax_by: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  none: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  one: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  /**
   * Returns a new array containing the items in self for which the block is not true.
   */
  reject: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  /**
   * Same as Array#each, but traverses self in reverse order.
   */
  reverse_each: function(callback) {
    this.reverse().each(callback)
  },
  
  /**
   * Invokes the block passing in successive elements from array, 
   * returning an array containing those elements for which the block returns a true 
   * value (equivalent to Enumerable#select).
   */
  select: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  sort: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  sort_by: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  }  ,

  take: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
  
  take_while: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  }
} )