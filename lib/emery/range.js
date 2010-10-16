var class = require('./class').class;
var Enumerable = require('./enumerable').Enumerable;

var RangeError = require('./exception').RangeError;
var NotImplementedError = require('./exception').NotImplementedError;

exports.ERange = ERange = class( {
	/**
	 * Constructs a range using the given start and end. If the third parameter 
	 * is omitted or is false, the range will include the end object; otherwise, 
	 * it will be excluded.
	 */
	initialize:  function(start, end, exclusive) {
		var tmp = []

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
