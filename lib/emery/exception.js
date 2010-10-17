var class = require('./class').class;

exports.Exception = Exception = class( {
  initialize: function(name, message) {
    if( name === undefined ) name = "Exception";
		this.name = name
    
    if( message === undefined ) message = this.name;
    this.message = message
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
