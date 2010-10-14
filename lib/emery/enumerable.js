var module = require('./module').module;

exports.Enumerable = Enumerable = module( {
	all: function(callback) {
		// TODO
	},
	
	any: function(callback) {
		// TODO
	},
	
	/**
	 * Invokes block once for each element of self. Creates a new array containing 
	 * the values returned by the block.
	 */
	map: function( callback ) {
		var ret = []
		for( i in this.__data__ ) {
			ret.push( callback(this.__data__[i]) )
		}
		return( new Array(ret) )
	},
	collect: function(callback) {
		return( this.map(callback) )
	},
	
	/**
	 * Returns the number of elements. If an argument is given, counts the number of 
	 * elements which equals to obj. If a block is given, counts the number of elements yielding 
	 * a true value.
	 */
	count: function(n) {
		// TODO
	},
	
	/**
	 * Calls block for each element repeatedly n times or forever if none or nil is given. If a 
	 * non-positive number is given or the array is empty, does nothing. Returns nil if the loop has 
	 * finished without getting interrupted.
	 */
	cycle: function(n ,callback) {
		// TODO
	},
	
	/**
	 * Drops first n elements from ary, and returns rest elements in an array.
	 */
	drop: function(n) {
		// TODO
	},
	
	/**
	 * Drops elements up to, but not including, the first element for which the block returns nil or 
	 * false and returns an array containing the remaining elements.
	 */
	drop_while: function(callback) {
		// TODO
	},
	
	each_slice: function(n ,callback) {
		// TODO
	},
	
	each_cons: function(n, callback) {
		
	},
	
	each_with_index: function(callback) {
		// TODO
	},
	
	each_with_object: function(obj, callback) {
		// TODO
	},
	
	find: function(callback) {
		// TODO
	},
	
	find_all: function(callback) {
		// TODO
	},
	
	find_index: function(callback) {
		// TODO
	},
	
	grep: function(callback) {
		// TODO
	},
	
	group_by: function(callback) {
		// TODO
	},
	
	/**
	 * Returns true if the given object is present in self (that is, if any object == anObject), 
	 * false otherwise.
	 */
	include: function(e) {
		var ret = false
		this.each( function(f) {
			if( f == e ) { ret = true }
		})
		return( ret )
	},
	
	inject: function(callback) {
		// TODO
	},
	
	max: function(callback) {
		// TODO
	},
	
	max_by: function(callback) {
		// TODO
	},
	
	min: function(callback) {
		// TODO
	},
	
	min_by: function(callback) {
		// TODO
	},
	
	minman: function(callback) {
		// TODO
	},
	
	minmax_by: function(callback) {
		// TODO
	},
	
	none: function(callback) {
		// TODO
	},
	
	one: function(callback) {
		// TODO
	},
	
	/**
	 * Returns a new array containing the items in self for which the block is not true.
	 */
	reject: function(callback) {
		// TODO
	},
	
	/**
	 * Same as Array#each, but traverses self in reverse order.
	 */
	reverse_each: function(callback) {
		this.reverse().each(callback)
	},
	
	sort: function(callback) {
		// TODO
	},
	
	sort_by: function(callback) {
		// TODO
	}	,

	take: function(callback) {
		// TODO
	},
  
	take_while: function(callback) {
		// TODO
	}
} )