'use strict';

require('./_utils');

var assert = require('assert');
var faker = require('../');

describe('locale: pl', function () {
  var phone_prefixes = ('12 13 14 15 16 17 18 22 23 24 25 29 32 33 34 41 42' +
      ' 43 44 46 48 52 54 55 56 58 59 61 62 63 65 67 68 71 74 75 76 77 81 82' +
      ' 83 84 85 86 87 89 91 94 95').split(' ').sort();

  var cell_prefixes = '50 51 53 57 60 66 69 72 73 78 79 88'.split(' ').sort();

  before(function () {
    faker.setLocale('pl');
  });

  it('pl_phone_number', function () {
    var prefixes = {};

    for (var i = 0; i < 1000; i++) {
      prefixes[faker.PhoneNumber.phoneNumber().slice(0, 2)] = 1;
    }

    assert.deepEqual(phone_prefixes, Object.keys(prefixes).sort());
  });

  it('pl_cell_phone', function () {
    var prefixes = {};

    for (var i = 0; i < 1000; i++) {
      prefixes[faker.PhoneNumber.cellPhone().slice(0, 2)] = 1;
    }

    assert.deepEqual(cell_prefixes, Object.keys(prefixes).sort());
  });

  after(function () {
    faker.setLocale(null);
  });
});
