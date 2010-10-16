var Emery = require('../lib/emery/emery').Emery;

var EArray = require('../lib/emery/array').EArray;
var ERange = require('../lib/emery/range').ERange;
var EHash = require('../lib/emery/hash').EHash;

module.exports = {
  'ISALPHA': function(assert) {
    assert.equal(true, Emery.ISALPHA('hello'));
		assert.equal(false, Emery.ISALPHA(123));
  },

  'ISDIGIT': function(assert) {
    assert.equal(false, Emery.ISDIGIT('hello'));
		assert.equal(true, Emery.ISDIGIT(123));
  },

	'CLASS': function(assert) {
		assert.equal("EArray", Emery.CLASS(new EArray()));
		assert.equal("EHash", Emery.CLASS(new EHash()));
		assert.equal("ERange", Emery.CLASS(new ERange()));
	},
};
