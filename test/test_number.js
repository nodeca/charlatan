'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').Number;

describe('Number', function () {
  it('number', function () {
    assert(tester.number(10).match(/[0-9]{10}/));

    for (var digits = 1; digits < 10; digits++) {
      assert(tester.number(digits).match(new RegExp('^[0-9]{' + digits + '}$')));
    }

    assert.equal(tester.number(10).length, 10);
    assert.equal(tester.number(1).length, 1);
    assert.equal(tester.number(0), '');
  });

  it('decimal', function () {
    assert(tester.decimal(2).match(/[0-9]{2}\.[0-9]{2}/));
    assert(tester.decimal(4, 5).match(/[0-9]{4}\.[0-9]{5}/));
  });

  it('digit', function () {
    assert(tester.digit().match(/[0-9]{1}/));

    var digits = {};
    for (var i = 0; i < 1000; i++) {
      digits[tester.digit()] = 1;
    }
    assert.deepEqual(Object.keys(digits).sort().join(''), '0123456789');
  });

  it('between', function () {
    for (var i = 0; i < 100; i++) {
      var random_number = tester.between(-50, 50);
      assert(random_number >= -50, 'Expected >= -50, but got ' + random_number);
      assert(random_number <=  50, 'Expected <= 50, but got ' + random_number);
    }
  });

  it('positive', function () {
    for (var i = 0; i < 100; i++) {
      var random_number = tester.positive(1, 100);
      assert(random_number >= 1,   'Expected >= 1, but got ' + random_number);
      assert(random_number <= 100, 'Expected <= 100, but got ' + random_number);
    }
  });

  it('negative', function () {
    for (var i = 0; i < 100; i++) {
      var random_number = tester.negative(-1, -100);
      assert(random_number <= -1,   'Expected <= -1, but got ' + random_number);
      assert(random_number >= -100, 'Expected >= -100, but got ' + random_number);
    }
  });

  it('force_positive', function () {
    var random_number = tester.positive(-1, -100);
    assert(random_number >= 1,   'Expected >= 1, but got ' + random_number);
    assert(random_number <= 100, 'Expected <= 100, but got ' + random_number);
  });

  it('force_negative', function () {
    var random_number = tester.negative(1, 100);
    assert(random_number <= -1,   'Expected <= -1, but got ' + random_number);
    assert(random_number >= -100, 'Expected >= -100, but got ' + random_number);
  });

  it('parameters_order', function () {
    var random_number = tester.between(100, 1);
    assert(random_number >= 1,   'Expected >= 1, but got ' + random_number);
    assert(random_number <= 100, 'Expected <= 100, but got ' + random_number);
  });

  it('hexadecimal', function () {
    assert(tester.hexadecimal(4).match(/[0-9a-f]{4}/));
    assert(tester.hexadecimal(7).match(/[0-9a-f]{7}/));
  });
});
