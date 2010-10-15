var class = require('./class').class;

exports.Exception = Exception = class( {
  initialize: function(name, message) {
    this.name = name
    
    if( message == undefined ) message = "Exception";
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

// exports.IndexError = IndexError = class( Exception, {
//   initialize: function(message) {
//     this.super( "IndexError", message )
//   }
// } )

var errorClasses = [
  "ArgumentError",
  "IndexError",
  "KeyError",
  "NameError",
  "NotImplementedError",
  "RangeError",
  "RegexpError",
  "RuntimeError",
  "StandardError",
  "SyntaxError",
  "TypeError",
  "ZeroDivisionError"
]

for( var klass in errorClasses ) {
  exports[errorClasses[klass]] = class( Exception, {
    initialize: function(message) {
      this.super( errorClasses[klass], message )
    }
  } )
}