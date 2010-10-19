var module = require('./module').module;

exports.Emery = Emery = module( {
  ISALPHA: function(data) {
    return( typeof(data) == 'string' )
  },
  
  ISDIGIT: function(data) {
    return( typeof(data) == 'number' )
  },
  
  ISNULL: function(data) {
    return( data === null )
  },
  
  ISUNDEF: function(data) {
    return( data === undefined )
  },

  ISUNDEFORNULL: function(data) {
    return( Emery.ISNULL(data) || Emery.ISUNDEF(data) )
  },
  
  NODEF_ARGS: function() {
    var ret = 0
    for( var i = 0; i < arguments.length; i++ ) {
      if( Emery.ISUNDEF(arguments[i]) ) ret++;
    }
    return(ret)
  },
  
  CLASS: function(data) {
    ret = null
    try { if( data instanceof EArray ) ret = "EArray"; }
    catch(e) {}
    try { if( data instanceof ERange ) ret = "ERange"; }
    catch(e) {}
    try { if( data instanceof EHash ) ret = "EHash"; }
    catch(e) {}
    try { if( data instanceof EString ) ret = "EString"; }
    catch(e) {}
    try { if( data instanceof ENumber ) ret = "ENumber"; }
    catch(e) {}
    try { if( data instanceof Exception ) ret = "Exception"; }
    catch(e) {}
    try { if( data instanceof ArgumentError ) ret = "ArgumentError"; }
    catch(e) {}
    try { if( data instanceof IndexError ) ret = "IndexError"; }
    catch(e) {}
    try { if( data instanceof KeyError ) ret = "KeyError"; }
    catch(e) {}
    try { if( data instanceof NameError ) ret = "NameError"; }
    catch(e) {}
    try { if( data instanceof NotImplementedError ) ret = "NotImplementedError"; }
    catch(e) {}
    try { if( data instanceof RangeError ) ret = "RangeError"; }
    catch(e) {}
    try { if( data instanceof RegexpError ) ret = "RegexpError"; }
    catch(e) {}
    try { if( data instanceof RuntimeError ) ret = "RuntimeError"; }
    catch(e) {}
    try { if( data instanceof StandardError ) ret = "StandardError"; }
    catch(e) {}
    try { if( data instanceof SyntaxError ) ret = "SyntaxError"; }
    catch(e) {}
    try { if( data instanceof TypeError ) ret = "TypeError"; }
    catch(e) {}
    try { if( data instanceof ZeroDivisionError ) ret = "ZeroDivisionError"; }
    catch(e) {}
    
    return(ret)
  },
} );