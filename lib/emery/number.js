var class = require('./class').class;

exports.ENumber = ENumber = class( {
  initialize: function(data) {
    this.__data__ = data
  },
  
  succ: function() {
    return( new ENumber(this.__data__+1) )
  },
  
  to_js: function() {
    return( this.__data__ )
  },
  inspect: function() {
    return( this.__data__ )
  },
  to_s: function() {
    return( this.__data__ )
  },
  to_str: function() {
    return( this.__data__ )
  },
  pretty_print: function() {
    return( this.__data__ )
  },
  
  cmp: function(n) {
    if( this.__data__ > n.__data__ ) return( 1 );
    if( this.__data__ < n.__data__ ) return( -1 );
    return( 0 )
  }
} );
