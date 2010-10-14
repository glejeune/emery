var class = require('./class').class;
var Enumerable = require('./enumerable').Enumerable;

exports.Array = Array = class( {
	initialize: function(a) {
		if( a == undefined ) {
			a = []
		}
		this.__data__ = a
		this.length = this.__data__.length
	},
	
	/*
	 * Calls block once for each element in self, passing that element as a parameter.
	 */
	each: function( callback ) {
		for( i in this.__data__ ) {
			callback(this.__data__[i])
		}
	},
	
	map$: function( callback ) {
		var tmp = this.map(callback);
		this.__data__ = tmp.__data__
		this.length = tmp.length
	},
	collect$: function(callback) {
		this.map$(callback)
	},
	
	/**
	 * Append—Pushes the given object(s) on to the end of this array. This expression 
	 * returns the array itself, so several appends may be chained together.
	 */
	push: function() {
		for( i in arguments ) {
			this.__data__.push(arguments[i])
		}
		this.length += arguments.length
	},
	
	/**
	 * Prepends objects to the front of array. other elements up one.
	 */
	unshift: function() {
		var ret = []
		for( i in arguments ) {
			ret.push( arguments[i] )
		}
		this.each( function(f) {
			ret.push(f)
		})
		this.__data__ = ret
		this.length += arguments.length
	},
	
	/**
	 * Appends the elements in other_array to self.
	 */
	concat: function(a) {
		var k = this
		a.each( function(e) {
			k.push(e)
		} )
	},
	
	/**
	 * Returns the element at index. A negative index counts from the end of self.
	 * Returns nil if the index is out of range.
	 */
	at: function(n) {
		var ret = null
		if( n < 0 ) {
			ret = this.__data__[this.length + n]
		} else {
			ret = this.__data__[n]
		}
		if( ret == undefined ) {
			ret = null
		}
		return( ret )
	},
	
	/**
	 * Removes the last element from self and returns it, or nil if the array is empty.
   *
	 * If a number n is given, returns an array of the last n elements (or less) just 
	 * like array.slice$(-n, n) does.
	 */
	pop: function(n) {
		if( n == undefined ) {
			n = 1
		}
		// TODO
	},
	
	/**
	 * Returns the first element of self and removes it (shifting all other elements down by one). 
	 * Returns nil if the array is empty.
   *
	 * If a number n is given, returns an array of the first n elements (or less) just like 
	 * array.slice$(0, n) does.
	 */
	shift: function(n) {
		if( n == undefined ) {
			n = 1
		}
		// TODO
	},
	
	/**
	 * Deletes the element(s) given by an index (optionally with a length). 
	 * Returns the deleted object, subarray, or nil if the index is out of range.
	 */
	slice: function(start, len) {
		if( len == undefined ) {
			len = 1
		}
		var slen = len;
				
		if( start > this.length-1 ) {
			return( null )
		}
		
		if( start < 0 ) {
			start = this.length + start
		}
		
		if( start + len - 1 > this.length ) {
			len = this.length - start
		}
		
		var ret = []
		for( var i = start, j = len; j > 0; i++, j-- ) {
			ret.push(this.at(i))
		}
		
		switch(slen) {
			case 1:
			  return( ret[0] );
				break;
			default:
				return( new Array(ret) )
		}
	},
	slice$: function(start, len) {
		var ret = this.slice(start, len)
		
		// TODO
		
		return( ret );
	},
	
	/**
	 * Create a printable version of array.
	 */
	pretty_print: function() {
		var ret = "["
		var sep = " "
		this.each(function(e){
			if( typeof(e) == 'string' ) {
				ret += sep + "'"+e+"'"
			} else {
				ret += sep + e
			}
			sep = ", "
		})
		ret += " ]"
		return( ret )
	},
	to_s: function() {
		return( this.pretty_print() )
	},
	inspect: function() {
		return( this.pretty_print() )
	},
	
	/**
	 * Returns the index of the first object in self such that is == to obj. 
	 * If a block is given instead of an argument, returns first object for which block is true. 
	 * Returns nil if no match is found.
	 */
	index: function(e) {
		var callback = e
		if( typeof(e) != 'function' ) {
			callback = function(x) { return( x == e ); }
		}
		var ret = null
		var cont = true
		var i = 0
		while( cont ) {
			if( callback(this.at(i)) ) {
				ret = i
				cont = false
			} else {
				cont = i < this.length
			}
			i++;
		}
		
		return( ret )
	},
	
	/**
	 * Deletes items from self that are equal to obj. If the item is not found, returns nil. 
	 * If the optional code block is given, returns the result of block if the item is not found.
	 */
	delete: function(e, callback) {
		var ret = null
		while( i = this.index(e) ) {
			ret = this.delete_at(i)
		}
		
		if( callback != undefined && ret == null ) {
			ret = callback()
		}
		return( ret )
	},

	/**
	 * Deletes the element at the specified index, returning that element, or nil if the index 
	 * is out of range. See also Array#slice$.
	 */
	delete_at: function(i) {
		if( i >= this.index ) {
			return( null )
		}
		
		var tmp = []
		var ret = this.at(i)
		var self = this
		this.each_index(function(j) {
			if( j != i ) {
				tmp.push(self.at(j))
			}
		})
		this.__data__ = tmp
		this.length = this.__data__.length
		
		return( ret )
	},

	/**
	 * Deletes every element of self for which block evaluates to true.
	 */
	delete_if: function(callback) {
		var tmp = []
		for( var i = 0; i < this.length; i++ ) {
			var elem = this.at(i)
			if( callback(elem) == false ) {
				tmp.push(elem)
			}
		}
		this.__data__ = tmp
		this.length = this.__data__.length
	},

	/**
	 * Same as Array#each, but passes the index of the element instead of the element itself.
	 */
	each_index: function(callback) {
		for( i in this.__data__ ) {
			callback(i)
		}
	},
	
	/**
	 * Returns true if self array contains no elements.
	 */
	empty: function() {
		return( this.length == 0 )
	},
	
	/**
	 * Returns true if array and other are the same object, or are both arrays 
	 * with the same content.
	 */
	eql: function(a) {
		// TODO
	},
	
	/**
	 * Tries to return the element at position index. If the index lies outside the array, 
	 * return null, the second form returns default, 
	 * and the third form returns the value of invoking the block, passing in the index. 
	 * Negative values of index count from the end of the array.
	 */
	fetch: function(i, e) {
		var ret = this.at(i)
		
		if( ret == null ) {
			return( null )
		}
		
		switch( typeof(e) ) {
			case 'undefined':
				break;
			case 'function':
				ret = e(i)
				break;
			default:
				ret = e
		}
		
		return( ret )
	},
	
	/**
	 * The first three forms set the selected elements of self (which may be the entire array) to obj. 
	 * A start of nil is equivalent to zero. A length of nil is equivalent to self.length. The last three 
	 * forms fill the array with the value of the block. The block is passed the absolute index of each 
	 * element to be filled.
	 */
	fill: function(e, start, length) {
		// TODO
	},
	
	/**
	 * Returns the first element, or the first n elements, of the array. If the array is empty, the first 
	 * form returns nil, and the second form returns an empty array.
	 */
	first: function(n) {
		// TODO
	},
	take: function(n) {
		return( this.first(n) )
	},
	
	/**
	 * Replaces the contents of self with the contents of other_array, truncating or expanding if necessary.
	 */
	replace: function(a) {
		this.__data__ = a.__data__
		this.length = a.length
	},
	
	/**
	 * Inserts the given values before the element with the given index (which may be negative).
	 */
	insert: function(index, o) {
		// TODO
	},
	
	/**
	 * Returns a string created by converting each element of the array to a string, separated by sep.
	 */
	join: function(sep) {
		if( sep == undefined ) {
			sep = ""
		}
		var ret = ""
		var ssep = ""
		this.each(function(e) {
			ret += ssep + e
			ssep = sep
		})
		return( ret )
	},
	
	/**
	 * Returns the last element(s) of self. If the array is empty, the first form returns nil.
	 */
	last: function(n) {
		// TODO
	},
	
	reject$: function(callback) {
		// TODO
	},
	
	/**
	 * Returns a new array containing self’s elements in reverse order.
	 */
	reverse: function() {
		var i = this.length - 1
		var tmp = []
		while( i >= 0 ) {
			tmp.push(this.at(i))
			i--
		}
		return( new Array(tmp) )
	},
	reverse$: function() {
		var tmp = this.reverse()
		this.__data__ = tmp.__data__
	},
		
	/**
	 * Returns a new array with elements of this array shuffled.
	 */
	shuffle: function() {
		// TODO
	},
	shuffle$: function() {
		// TODO
	},
	
	/**
	 * Passes elements to the block until the block returns nil or false, 
	 * then stops iterating and returns an array of all prior elements.
	 */
	take_while: function(callback) {
		// TODO
	},
	
	/**
	 * Returns a new array by removing duplicate values in self.
	 */
	uniq: function() {
		var ret = new Array()
		var always = new Array()
		this.each(function(e) {
			if( always.include(e) == false ) {
				ret.push(e)
				always.push(e)
			}
		})
		return(ret)
	},
	uniq$: function() {
		var tmp = this.uniq()
		this.__data__ = tmp.__data__
		this.length = tmp.length
	},
	
	/**
	 * Invokes the block passing in successive elements from array, 
	 * returning an array containing those elements for which the block returns a true 
	 * value (equivalent to Enumerable#select).
	 */
	select: function(callback) {
		// TODO
	},
	
	/** 
	 * Returns an array containing the elements in self corresponding to the given selector(s). 
	 * The selectors may be either integer indices or ranges. See also Array#select.
	 */
	values_at: function() {
		// argument...
	},
	
	/**
	 * Removes all elements from self.
	 */
	clear: function() {
		this.__data__ = []
		this.length = 0
	},
	
	/**
	 * Returns a copy of self with all nil elements removed.
	 */
	compact: function() {
		// TODO
	},
	compact$: function() {
		// TODO
	},
	
} )

Array.include(Enumerable)
