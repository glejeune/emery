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
		if( data instanceof EArray ) {
			ret = "EArray"
		}
		if( data instanceof ERange ) {
			ret = "ERange"
		}
		if( data instanceof EHash ) {
			ret = "EHash"
		}
		if( data instanceof EString ) {
			ret = "EHash"
		}
		if( data instanceof ENumber ) {
			ret = "EHash"
		}
		return(ret)
	},
} );