var module = require('./module').module;

exports.Emery = Emery = module( {
	ISALPHA: function(data) {
		return( typeof(data) == 'string' )
	},
	
	ISDIGIT: function(data) {
		return( typeof(data) == 'number' )
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
		return(ret)
	},
} );