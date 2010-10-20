var Emery = require('./emery').Emery;
var class = require('./class').class;

var EArray = require('./array').EArray;
var Enumerable = require('./enumerable').Enumerable;

var KeyError = require('./exception').KeyError;
var NotImplementedError = require('./exception').NotImplementedError;

exports.EHash = EHash = class( {
  initialize: function(h) {
    if(Emery.ISUNDEFORNULL(h)) h = {};
    this.replace(h)
  },
  
  replace: function(h) {
    if( Emery.CLASS(h) == 'EHash' ) h = h.__hash__;
    
    this.__hash__ = h
    this.__keys__ = new EArray()
    this.__values__ = new EArray()
    this.__data__ = []
    
    for(var k in h) {
      this.__keys__.push(k)
      this.__values__.push(h[k])
      this.__data__.push([k, h[k]])
    }

    this.length = this.__data__.length
  },
  
  each: function(callback) {
    for(var k in this.__hash__) {
      callback(k, this.__hash__[k])
    }
  },
  each_pair: function(callback) {
    this.each(callback)
  },
  
  each_key: function(callback) {
    this.__keys__.each(callback)
  },
  
  each_value: function(callback) {
    this.__values__.each(callback)
  },
  
  clear: function() {
    this.__hash__ = {}
    this.__keys__ = new EArray()
    this.__values__ = new EArray()
    this.__data__ = []
    this.length = this.__data__.length
  },
  
  empty: function() {
    return(this.length == 0)
  },
  
  values: function() {
    return(this.__values__.clone())
  },
  
  has_value: function(v) {
    return(this.__values__.include(v))
  },
  value: function(v) {
    return(this.has_value(v))
  },
  
  keys: function() {
    return(this.__keys__.clone())
  },
  
  has_key: function(k) {
    return(this.__keys__.include(k))
  },
  member: function(k) {
    return(this.has_key(k))
  },
  key: function(k) {
    return(this.has_key(k))
  },
  
  map: function( callback ) {
    var ret = []
    for( var k in this.__hash__ ) {
      ret.push( callback(k, this.__hash__[k]) )
    }
    return( new EArray(ret) )
  },
  
  invert: function() {
    var ret = {}
    for( var k in this.__hash__ ) {
      ret[this.__hash__[k]] = k
    }
    return( new EHash(ret) )
  },
  
  to_js: function() {
    return( this.__hash__ )
  },
  
  clone: function() {
    var tmp = {}
    this.each(function(k, v){
      tmp[k] = v
    })
    return(new EHash(tmp))
  },
  
  merge: function(h, callback) {
    var ret = this.clone()
    h.each(function(k, v) {
      if(Emery.ISUNDEFORNULL(callback)) {
        ret.set(k, v)
      } else {
        ret.set(k, callback(k, ret.get(k), v))
      }
    })
    return(ret)
  },
  merge$: function(h, callback) {
    var tmp = this.merge(h, callback)
    this.__hash__ = tmp.__hash__
    this.__keys__ = tmp.__keys__
    this.__values__ = tmp.__values__
    this.__data__ = tmp.__data__
    this.length = this.__data__.length
    return( this )
  },
  update: function(h, callback) {
    return( this.merge$(h, callback) )
  },
  
  delete: function(k, callback) {
    var tmp = {}
    var deleted = null
    
    for( var i in this.__hash__ ) {
      if( i == k ) {
        deleted = this.__hash__[i]
      } else {
        tmp[i] = this.__hash__[i]
      }
    }
    
    if( Emery.ISUNDEFORNULL(deleted) ) {
      if( Emery.ISUNDEFORNULL(callback) ) {
        return( null )
      } else {
        return( callback(k) )
      }
    }
    
    this.replace(tmp)
    
    return(deleted)
  },
  
  delete_if: function(callback) {
    var self = this
    this.each(function(k, v) {
      if( callback(k, v) == true ) {
        self.delete(k)
      }
    })
    
    return(this)
  },
  
  fetch: function(k, callback) {
    if( Emery.ISUNDEFORNULL(callback) ) {
      callback = function(e) {
        throw( new KeyError('`fetch\': key not found') )
      }
    } if( typeof(callback) != 'function' ) {
      var tmp = callback;
      callback = function(e) { return( tmp ); }
    }
    
    var ret = this.__hash__[k]
    if( Emery.ISUNDEFORNULL(ret) ) return( callback(k) );
    return( ret )
  },
  
  /**
   * Create a printable version of hash.
   */
  pretty_print: function() {
    return( this.inspect() )
  },
  to_s: function() {
    return( this.inspect() )
  },
  inspect: function() {
    var ret = "{"
    var sep = " "
    this.each(function(k, v){
      ret += sep + k
      if( typeof(v) == 'string' ) {
        ret += " => '"+v+"'";
      } else {
        try { ret += " => "+v.inspect(); }
        catch(e) { ret += " => "+v; }
      }
      sep = ", "
    })
    ret += " }"
    return( ret )
  },

  set: function(k, v) {
    this.__hash__[k] = v
    this.__keys__.push(k)
    this.__values__.push(v)
    this.__data__.push([k, v])
    this.length = this.__data__.length
  },
  store: function(k, v) {
    this.set(k, v)
  },
  
  get: function(k) {
    return( this.__hash__[k] )
  },
} );

EHash.include(Enumerable);

