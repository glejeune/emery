var Array = require('../lib/emery/array').Array;

var one = new Array([3, 4, 5])

module.exports = {
  'new Array()': function(assert) {
	  assert.equal(3, one.length);
  }, // [3, 4, 5]

	'Array#push()': function(assert) {
		one.push(6, 7)
		assert.equal(5, one.length);
	}, // [3, 4, 5, 6, 7]
	
	'Array#unshift': function(assert) {
		one.unshift(1, 2)
		assert.equal(7, one.length)
	}, // [1, 2, 3, 4, 5, 6, 7]
	
	'Array#at': function(assert) {
		assert.equal(1, one.at(0))
		assert.equal(2, one.at(1))
		assert.equal(3, one.at(2))
		assert.equal(4, one.at(3))
		assert.equal(5, one.at(4))
		assert.equal(6, one.at(5))
		assert.equal(7, one.at(6))
	},
	
	'Array#at(-)': function(assert) {
		assert.equal(7, one.at(-1))
		assert.equal(6, one.at(-2))
		assert.equal(5, one.at(-3))
		assert.equal(4, one.at(-4))
		assert.equal(3, one.at(-5))
		assert.equal(2, one.at(-6))
		assert.equal(1, one.at(-7))
	},
	
	'Array#each': function(assert) {
		var result = 0
		one.each(function(e) { 
			result += e
		})
		assert.equal(28, result)
	},
	
	'Array#map': function(assert) {
		var two = one.map(function(e) {
			return(e*e)
		})
		assert.equal(7, two.length)
		assert.equal(1, two.at(0))
		assert.equal(4, two.at(1))
		assert.equal(9, two.at(2))
		assert.equal(16, two.at(3))
		assert.equal(25, two.at(4))
		assert.equal(36, two.at(5))
		assert.equal(49, two.at(6))
	},

	'Array#map$': function(assert) {
		one.map$(function(e) {
			return(e*e)
		})
		assert.equal(7, one.length)
		assert.equal(1, one.at(0))
		assert.equal(4, one.at(1))
		assert.equal(9, one.at(2))
		assert.equal(16, one.at(3))
		assert.equal(25, one.at(4))
		assert.equal(36, one.at(5))
		assert.equal(49, one.at(6))
	}, // [1, 4, 9, 16, 25, 36, 49]

	'Array#include': function(assert) {
		assert.ok(one.include(36))
		assert.ok(one.include(20) == false)
	},
	
	'Array#concat': function(assert) {
		one.concat(new Array([64,81]))
		assert.equal(9, one.length)
		assert.equal(64, one.at(7))
		assert.equal(81, one.at(8))
	}, // [1, 4, 9, 16, 25, 36, 49, 64, 81]
	
	'Array#slice': function(assert) {
		var two = one.slice(1)
		assert.equal(4, two)
		var two = one.slice(1,2)
		assert.equal(2, two.length)
		assert.eql(new Array([4,9]), two)
		var two = one.slice(-3, 3)
		assert.eql(new Array([49, 64, 81]), two)
		var two = one.slice(8, 10)
		assert.eql(new Array([81]), two)
		var two = one.slice(-2)
		assert.equal(64, two)
	},
	
	'Array#empty': function(assert) {
		var two = new Array()
		assert.ok( two.empty() )
		assert.ok( one.empty() == false )
	},
	
	'Array#fetch': function(assert) {
		assert.equal(16, one.fetch(3))
		assert.isNull(one.fetch(200))
		assert.equal("hello", one.fetch(3, "hello"))
		assert.equal(9, one.fetch(3, function(i) {
			return( i * i )
		}))
	},
	
	'Array#replace': function(assert) {
		var two = new Array([1,2])
		two.replace(one)
		assert.eql(one, two)
	},
	
	'Array#clear': function(assert) {
		var two = new Array([1,2])
		two.clear()
		assert.eql(new Array(), two)
	},
	
	'Array#index': function(assert) {
		assert.equal(0, one.index(1))
		assert.equal(6, one.index(49))
		assert.isNull(one.index(999))
		assert.equal(6, one.index(function(e){
			return( e == 49 )
		}))
		assert.equal(7, one.index(function(e){
			return( e > 49 )
		}))
	},
	
	'Array#delete_at': function(assert) {
		assert.equal(16, one.delete_at(3))
		assert.isNull(one.delete_at(999))
		assert.equal(25, one.delete_at(3))
		assert.equal(7, one.length)
	}, // [1, 4, 9, 36, 49, 64, 81]
	
	'Array#delete': function(assert) {
		one.push(49)
		assert.isNull(one.delete(124))
		assert.equal("nothing", one.delete(124, function(){
			return( "nothing" );
		}))
		assert.equal(81, one.delete(81))
		assert.equal(49, one.delete(49, function() {
			return( "nothing" );
		}))
    assert.equal(5, one.length)
	}, // [1, 4, 9, 36, 64]
	
	'Array#delete_if': function(assert) {
		one.delete_if(function(e){
			return( e > 9 )
		})
		assert.equal(3, one.length)
	}, // [1, 4, 9]
	
	'Array#join': function(assert) {
		assert.equal("1-4-9", one.join("-"))
		assert.equal("149", one.join())
		assert.equal("1|4|9", one.join("|"))
	},
	
	'Array#reverse': function(assert) {
		assert.eql(new Array([9, 4, 1]), one.reverse())
	},

	'Array#reverse$': function(assert) {
		one.reverse$()
		assert.eql(new Array([9, 4, 1]), one)
	}, // [9, 4, 1]
	
	'Array#uniq': function(assert) {
		one.push(1,4,4,9)
		assert.eql(new Array([9, 4, 1]), one.uniq())
	}, // [ 9, 4, 1, 1, 4, 4, 9 ]
	
	'Array#uniq$': function(assert) {
		one.uniq$()
		assert.eql(new Array([9, 4, 1]), one)
	}, // [9, 4, 1]
};