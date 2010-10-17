var Emery = require('./emery').Emery;
var class = require('./class').class;

var Enumerable = require('./enumerable').Enumerable;
var EString = require('./string').EString;
var ENumber = require('./number').ENumber;

var RangeError = require('./exception').RangeError;
var ArgumentError = require('./exception').ArgumentError;
var NotImplementedError = require('./exception').NotImplementedError;

exports.ERange = ERange = class( {
	/**
	 * Constructs a range using the given start and end. If the third parameter 
	 * is omitted or is false, the range will include the end object; otherwise, 
	 * it will be excluded.
	 */
	initialize:  function(start, end, exclusive) {
		if( Emery.ISNULL(exclusive) ) exclusive = false 
		
		var undefargs = Emery.NODEF_ARGS(start, end)
		if( undefargs > 0 ) {
			throw( new ArgumentError("wrong number of arguments ("+(2-undefargs)+" for 2)") )
		}
		
		if( Emery.ISALPHA(start) ) start = new EString(start);
		if( Emery.ISALPHA(end) ) end = new EString(end);
		if( Emery.ISDIGIT(start) ) start = new ENumber(start);
		if( Emery.ISDIGIT(end) ) end = new ENumber(end);
		
		try {
			start.succ()
		} 
		catch(e) {
			throw( new ArgumentError("bad value for range") )
		}
		try {
			end.succ()
		} 
		catch(e) {
			throw( new ArgumentError("bad value for range") )
		}
		
		var tmp = []
		
		this.__start__ = start
		this.__end__ = end
    this.__data__ = tmp
    this.length = this.__data__.length
  },

	begin: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	cover: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	each: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	end: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	eql: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	exclude_end: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	first: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	hash: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	last: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	member: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	inspect: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
	pretty_print: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
	to_s: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },

	step: function(callback) {
    throw( new NotImplementedError() ); // -> TODO
  },
} );

ERange.include(Enumerable);

// -------

try {
r = new ERange()
}
catch(e) {
	console.log(e)
}

try {
r = new ERange(null)
}
catch(e) {
	console.log(e)
}

try {
r = new ERange(1,3)
}
catch(e) {
	console.log(e)
}