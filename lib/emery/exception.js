var Emery = require('./emery').Emery;

exports.Exception = Exception = class( {
  initialize: function( ) {
    switch( arguments.length ) {
      case 0:
        this.name = "Exception";
        this.message = "Exception";
        break;
      case 1:
        this.name = "Exception";
        this.message = arguments[0];
        break;
      default:
        this.name = arguments[0];
        this.message = arguments[1];
    }
  },
  
  inspect: function() {
    return( "#<" + this.name + ": " + this.message + ">" )
  },
  to_s: function() {
    return( this.message )
  },
  to_str: function() {
    return( this.message )
  }
} )

exports.ArgumentError = ArgumentError = class( Exception, {
  initialize: function(message) {
    this.super( "ArgumentError", message )
  }
} )

exports.IndexError = IndexError = class( Exception, {
  initialize: function(message) {
    this.super( "IndexError", message )
  }
} )

exports.KeyError = KeyError = class( Exception, {
  initialize: function(message) {
    this.super( "KeyError", message )
  }
} )

exports.NameError = NameError = class( Exception, {
  initialize: function(message) {
    this.super( "NameError", message )
  }
} )

exports.NotImplementedError = NotImplementedError = class( Exception, {
  initialize: function(message) {
    this.super( "NotImplementedError", message )
  }
} )

exports.RangeError = RangeError = class( Exception, {
  initialize: function(message) {
    this.super( "RangeError", message )
  }
} )

exports.RegexpError = RegexpError = class( Exception, {
  initialize: function(message) {
    this.super( "RegexpError", message )
  }
} )

exports.RuntimeError = RuntimeError = class( Exception, {
  initialize: function(message) {
    this.super( "RuntimeError", message )
  }
} )

exports.StandardError = StandardError = class( Exception, {
  initialize: function(message) {
    this.super( "StandardError", message )
  }
} )

exports.SyntaxError = SyntaxError = class( Exception, {
  initialize: function(message) {
    this.super( "SyntaxError", message )
  }
} )

exports.TypeError = TypeError = class( Exception, {
  initialize: function(message) {
    this.super( "TypeError", message )
  }
} )

exports.ZeroDivisionError = ZeroDivisionError = class( Exception, {
  initialize: function(message) {
    this.super( "ZeroDivisionError", message )
  }
} )
