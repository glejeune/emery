exports.class = class = function( parent, definition ) {
  if( definition == undefined ) {
    definition = parent
    parent = null
  }
  
  // The class !!
  var Klass = function() {
    this.superclass = parent;
    this.initialize.apply(this, arguments);
  }
  
  //
  // Instance methods 
  //
  
  // super : call the superclass initialize method
  Klass.prototype.super = function() {
    this._initialize.apply(this, arguments)
  }
  
  // methods : return the list of methods in the class
  Klass.prototype.methods = function() {
    var ret = []
    for( var meth in Klass.prototype ) {
      ret.push(meth)
    }
    return( ret )
  }

	// respond_to : Returns true if obj responds to the given method.
	Klass.prototype.respond_to = function(symbol) {
		var ret = false
		for( var meth in Klass.prototype ) {
      ret = ret || (meth == symbol)
    }
		return( ret )
	}
  
  //
  // Class methods
  //
  
  // define : define a new method
  Klass.define = function( name, callback ) {
    Klass.prototype[name] = callback
  }
  
  // include : include methods
  Klass.include = function(definition) {
    for( var meth in definition ) {
      // Instance method
      if( Klass.prototype[meth] == undefined ) {
        Klass.prototype[meth] = definition[meth]
      }
    }
    
  }
  
  //
  // Add methods
  //
  for( var meth in definition ) {
    if( meth.search(/self\$/) == 0 ) {
      // Class method
      var meth_name = meth.substr(5)
      Klass[meth_name] = definition(meth)
    } else {
      // Instance method
      if( Klass.prototype[meth] == undefined ) {
        Klass.prototype[meth] = definition[meth]
      }
    }
  }
  
  //
  // Create an empty initialize method (if needed)
  //
  if( definition.initialize == undefined ) {
    Klass.prototype.initialize = function() {}
  }
  
  //
  // Inheritance
  //
  if( parent != null ) {
    // Add parent instances methods 
    for( var meth in parent.prototype ) {
      if( Klass.prototype[meth] == undefined && meth != "initialize" ) {
        Klass.prototype[meth] = parent.prototype[meth]
      }
    }
    
    // Create the parent initialize method
    if( parent.prototype["initialize"] != undefined ) {
      Klass.prototype._initialize = parent.prototype.initialize
    }
    
    // Add parent class methods
    for( var meth in parent ) {
      if( Klass[meth] == undefined ) {
        Klass[meth] = parent[meth]
      }
    }
  }

  return( Klass );
}
