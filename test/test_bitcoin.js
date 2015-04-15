'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').Bitcoin;

describe('Bitcoin', function () {
  it('integer division', function () {
    function addTest(divident, quotient, remainder) {
      var buf = new Buffer(divident);
      assert.equal(tester._divide(buf, 58), remainder);
      assert.deepEqual(buf, new Buffer(quotient));
    }

    addTest([ 0, 0 ], [ 0, 0 ], 0);
    addTest([ 0, 57 ], [ 0, 0 ], 57);
    addTest([ 0, 58 ], [ 0, 1 ], 0);
    addTest([ 0, 123 ], [ 0, 2 ], 7);
    addTest([ 1, 234 ], [ 0, 8 ], 26);
    addTest([ 123, 45 ], [ 2, 31 ], 39);
    addTest([ 34, 24, 245, 3, 45, 20, 185, 94, 24, 59 ], [ 0, 150, 127, 207, 128, 198, 250, 94, 79, 221 ], 41);
    addTest([ 0, 0, 0, 0, 255, 255 ], [ 0, 0, 0, 0, 4, 105 ], 53);
  });

  it('base58 - leading zeroes', function () {
    var buf = new Buffer('000000001234567890abcdef', 'hex');

    assert.equal(tester._base58(buf), '111143c9JGZmRvE');
  });

  it('base58 - real example', function () {
    var buf = new Buffer('003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187', 'hex');

    assert.equal(tester._base58(buf), '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS');
  });

  it('checksum', function () {
    assert.equal(tester._addressFor('main', new Array(41).join('0')), '1111111111111111111114oLvT2');
    assert.equal(tester._addressFor('main', new Array(41).join('f')), '1QLbz7JHiBTspS962RLKV8GndWFwi5j6Qr');
    assert.equal(tester._addressFor('testnet', new Array(41).join('0')), 'mfWxJ45yp2SFn7UciZyNpvDKrzbhyfKrY8');
  });

  it('address', function () {
    assert(tester.address().match(/^[13][1-9A-Za-z][^OIl]{20,40}/));
  });

  it('testnet_address', function () {
    assert(/^[mn][1-9A-Za-z]{32,34}$/.test(tester.testnetAddress()));
    assert(!/[OIl]/.test(tester.testnetAddress()));
  });
});
