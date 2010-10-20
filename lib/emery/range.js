var Emery = require('./emery').Emery;
var class = require('./class').class;

var Enumerable = require('./enumerable').Enumerable;
var EString = require('./string').EString;
var ENumber = require('./number').ENumber;
var EArray = require('./array').EArray;

var RangeError = require('./exception').RangeError;
var ArgumentError = require('./exception').ArgumentError;
var NotImplementedError = require('./exception').NotImplementedError;

exports.ERange = ERange = class( {
  /**
   * Constructs a range using the given start and end. If the third parameter 
   * is omitted or is false, the range will include the end object; otherwise, 
   * it will be excluded.
   */
  initialize:  function(start, end, exclusive) {
    if( Emery.ISUNDEFORNULL(exclusive) ) exclusive = false 
    
    var undefargs = Emery.NODEF_ARGS(start, end)
    if( undefargs > 0 ) {
      throw( new ArgumentError("wrong number of arguments ("+(2-undefargs)+" for 2)") )
    }
    
    var _start = start
    var _end = end
    
    if( Emery.ISALPHA(start) ) _start = new EString(start);
    if( Emery.ISALPHA(end) ) _end = new EString(end);
    if( Emery.ISDIGIT(start) ) _start = new ENumber(start);
    if( Emery.ISDIGIT(end) ) _end = new ENumber(end);
    
    if( Emery.CLASS(_start) != Emery.CLASS(_end) || _start.cmp(_end) > 0) {
      throw( new ArgumentError("bad value for range") )
    }
    try {
      _start.succ()
    } 
    catch(e) {
      throw( new ArgumentError("bad value for range") )
    }
    try {
      _end.succ()
    } 
    catch(e) {
      throw( new ArgumentError("bad value for range") )
    }
    
    var tmp = []
    var x = _start
    while( x.cmp(_end) != 0 ) {
      if( (Emery.ISALPHA(start) || Emery.ISDIGIT(start)) && (Emery.ISALPHA(end) || Emery.ISDIGIT(end)) ) {
        tmp.push(x.to_js())
      } else {
        tmp.push(x)
      }
      
      x = x.succ()
    } 
    if( exclusive == false ) {
      if( (Emery.ISALPHA(start) || Emery.ISDIGIT(start)) && (Emery.ISALPHA(end) || Emery.ISDIGIT(end)) ) {
        tmp.push(x.to_js())
      } else {
        tmp.push(x)
      }
    }
    
    this.__start__ = start
    this.__end__ = end
    this.__data__ = tmp
    this.__exclusive__ = exclusive
    this.length = this.__data__.length
  },

  /**
   * Returns the first object in range.
   */
  begin: function() {
    return( this.__start__ )
  },

  /**
   * Returns true if obj is between beg and end, i.e beg <= obj <= end 
   * (or end exclusive when exclude_end? is true).
   */
  cover: function(e) {
    return( this.include(e) );
  },

  /**
   * Iterates over the elements rng, passing each in turn to the block. You can only iterate 
   * if the start object of the range supports the succ method (which means that you can’t 
   * iterate over ranges of Float objects).
   */
  each: function(callback) {
    for( i in this.__data__ ) {
      callback(this.__data__[i])
    }
  },

  /**
   * Returns the object that defines the end of rng.
   */
  end: function() {
    return( this.__end__ )
  },

  /**
   * Returns true only if obj is a Range, has equivalent beginning and end items 
   * (by comparing them with eql?), and has the same exclude_end? setting as rng.
   */
  eql: function(r) {
    throw( new NotImplementedError() ); // -> TODO
  },

  /**
   * Returns true if rng excludes its end value.
   */
  exclude_end: function() {
    return( this.__exclusive__ )
  },

  /**
   * Returns the first object in rng, or the first n elements.
   */
  first: function(n) {
    var ret = this.to_a()
    return( ret.first(n) )
  },

  /**
   * Generate a hash value such that two ranges with the same start and end points, 
   * and the same value for the “exclude end” flag, generate the same hash value.
   */
  hash: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

  /**
   * Returns the last object in rng, or the last n elements.
   */
  last: function(n) {
    var ret = this.to_a()
    return( ret.last(n) )
  },

  /**
   * Returns true if obj is an element of rng, false otherwise. If beg and end are 
   * numeric, comparison is done according magnitude of values.
   */
  member: function(e) {
    return( this.include(e) )
  },

  /**
   * Convert this range object to a printable form (using inspect to convert the start and end objects).
   */
  inspect: function() {
    var ret = "["
    var sep = " "
    this.each(function(e){
      if( typeof(e) == 'string' ) {
        ret += sep + "'"+e+"'"
      } else {
        ret += sep + e
      }
      sep = ", "
    })
    ret += " ]"
    return( ret )
  },
  pretty_print: function() {
    return( this.inspect() )
  },
  to_s: function() {
    return( this.inspect() )
  },
  to_js: function() {
    return( this.__data__ )
  },
  
  /**
   * Return the EArray 
   */
  to_a: function() {
    return( new EArray(this.__data__) )
  },

  /**
   * Iterates over rng, passing each nth element to the block. If the range contains numbers, 
   * n is added for each iteration. Otherwise step invokes succ to iterate through range elements. 
   * The following code uses class Xs, which is defined in the class-level documentation.
   */
  step: function(n, callback) {
    if( Emery.ISUNDEFORNULL(callback) ) {
      callback = n
      n = 1
    }
    var i = 0
    this.each(function(e) {
      i++
      if( i%n == 1 ) callback(e)
    })
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
    return( new EArray(ret) )
  },
} );

ERange.include(Enumerable);
