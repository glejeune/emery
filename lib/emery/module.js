exports.module = module = function( definitions ) {
  definitions.extend = function( klass ) {
    for( var meth in this ) {
      switch( typeof(klass) ) {
        case "function":
          if( klass.prototype[meth] == undefined && meth != "extend" ) {
            klass.prototype[meth] = this[meth]
          }
          break;
        case "object":
          if( klass[meth] == undefined && meth != "extend" ) {
            klass[meth] = this[meth]
          }
          break;
        default:
          throw "Module.extend error!";
      }
    } 
  }
  
  return( definitions );
}
