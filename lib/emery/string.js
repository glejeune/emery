var class = require('./class').class;
var NotImplementedError = require('./exception').NotImplementedError;

// This code is really horrible. Sorry ->

function str_split_by_type(s) {
  var sstrs = []
  var stypes = []
  var last = null
  
  for( var i in s ) {
    var v = s.charCodeAt(i);

    // Numeric
    if( v >= 48 && v <= 57 ) {
      if( last != 'numeric' ) {
        if( last != null ) stypes.push(last);
        sstrs.push("")
      }
      sstrs[sstrs.length - 1] += s[i]
      last = 'numeric'
    }

    // Alpha lowercase
    else if( v >= 97 && v <= 122 ) {
      if( last != 'lowercase' ) {
        if( last != null ) stypes.push(last);
        sstrs.push("")
      }
      sstrs[sstrs.length - 1] += s[i]
      last = 'lowercase'
    }

    // Alpha uppercase
    else if( v >= 65 && v <= 90 ) {
      if( last != 'uppercase' ) {
        if( last != null ) stypes.push(last);
        sstrs.push("")
      }
      sstrs[sstrs.length - 1] += s[i]
      last = 'uppercase'
    }

    // Other
    else {
      if( last != 'nonalphanum' ) {
        if( last != null ) stypes.push(last);
        sstrs.push("")
      }
      sstrs[sstrs.length - 1] += s[i]
      last = 'nonalphanum'
    }
  }
  
  stypes.push(last)
  return( { data: sstrs, types: stypes } )
}

function char_succ(data, add) {
  if( add == 0 ) {
    return( { data: data, add: add } )
  }
  
  var v = data.charCodeAt(0)
  var newdata = data
  var newadd = 0
  
  // Numeric
  if( v >= 48 && v <= 57 ) {
    if( v+add <= 57 ) {
      newdata = String.fromCharCode(v+add)
    } else {
      newdata = String.fromCharCode(47 + (v+add)%57)
      newadd = add
    }
  }

  // Alpha lowercase
  else if( v >= 97 && v <= 122 ) {
    if( v+add <= 122 ) {
      newdata = String.fromCharCode(v+add)
    } else {
      newdata = String.fromCharCode(96 + (v+add)%122)
      newadd = add
    }
  }

  // Alpha uppercase
  else if( v >= 65 && v <= 90 ) {
    if( v+add <= 90 ) {
      newdata = String.fromCharCode(v+add)
    } else {
      newdata = String.fromCharCode(64 + (v+add)%90)
      newadd = add
    }
  }

  // Other
  else {
    w = v + add
    if( v <= 47 && w > 47 ) {
      w = 57 + w - 47
    }
    if( v >= 58 && v <= 64 && w > 64 ) {
      w = 90 + w - 64
    }
    if( v >= 91 && v <= 96 && w > 96 ) {
      w = 122 + w - 96
    }
    if( v >= 123 && v > 255 ) {
      v = w - 255
      newadd = add
    }
    newdata = String.fromCharCode(w)
  }
  
  return( { data: newdata, add: newadd } )
}

function char_of_type(type, i) {
  var v = 0
  switch(type) {
    case 'numeric':
      v = 47 + i
      break;
    case 'lowercase':
      v = 96 + i
      break;
    case 'uppercase':
      v = 64 + i
      break;
    default:
      v = i
  }
  
  return( String.fromCharCode(v) )
}

function str_succ(type, data, inc, add) {
  if( add == 0 ) {
    return( { data: data, add: add } )
  }

  var newdata = ""
  var newadd = add
  
  if( type == 'numeric' && inc == true ) {
    newdata = eval(data)+1
    newadd = 0
  } else {
    for( var i = data.length - 1; i >= 0; i-- ) {
      var r = char_succ( data[i], newadd )
      newdata = r.data + newdata
      newadd = r.add
    }
    if( inc == true && newadd > 0 ) {
      newdata += char_of_type(type, newadd)
    }
  }

  return( { data: newdata, add: newadd } )
}

// <- This code is really horrible. Sorry

exports.EString = EString = class( {
  initialize: function(data) {
    this.__data__ = data
    this.length = this.__data__.length
  },
  
  succ: function() {
    var r = str_split_by_type(this.__data__)
    var add = 1
    var res = ""
    for( var i = r.types.length - 1; i >= 0; i-- ) {
      var rr = str_succ( r.types[i], r.data[i], i == 0, add )
      res = rr.data + res
      add = rr.add
    }
    return(new EString(res))
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
  to_js: function() {
    return( this.__data__ )
  },
  pretty_print: function() {
    return( this.__data__ )
  },

  cmp: function(n) {
    if( this.__data__ > n.__data__ ) {
      if( this.__data__.length >= n.__data__.length ) return( 1 );
      return( -1 );
    }
    if( this.__data__ < n.__data__ ) { 
      if( this.__data__.length <= n.__data__.length ) return( -1 );
      return( 1 )
    }
    return( 0 )
  }
} );
