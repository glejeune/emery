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

  begin: function() {
    return( this.__data__[0] )
  },

  cover: function(e) {
    return( this.include(e) );
  },

  each: function(callback) {
    for( i in this.__data__ ) {
      callback(this.__data__[i])
    }
  },

  end: function() {
    return( this.__data__[this.__data__.length - 1] )
  },

  eql: function(r) {
    throw( new NotImplementedError() ); // -> TODO
  },

  exclude_end: function() {
    return( this.__exclusive__ )
  },

  first: function(n) {
    var ret = this.to_a()
    return( ret.first(n) )
  },

  hash: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

  last: function(n) {
    var ret = this.to_a()
    return( ret.last(n) )
  },

  member: function(e) {
    return( this.include(e) )
  },

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
  
  to_a: function() {
    return( new EArray(this.__data__) )
  },

  step: function(n, callback) {
    var i = 0
    this.each(function(e) {
      i++
      if( i%n == 1 ) callback(e)
    })
  },
} );

ERange.include(Enumerable);
