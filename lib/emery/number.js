var class = require('./class').class;

exports.ENumber = ENumber = class( {
	initialize: function(data) {
		this.__data__ = data
	},
	
	succ: function() {
		return( this.__data__+1 )
	}
} );
