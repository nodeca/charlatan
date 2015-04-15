'use strict';

require('./_utils');

var assert = require('assert');
var faker = require('../');

describe('finance', function () {
  var valid_ones = [
    '3019-872113-1171',
    '3051-346334-7720',
    '5019-8865-5667-8258',
    '506520872154623929',
    '5213-8618-8032-6704',
    '5420-2970-4793-7043',
    '6011-6282-1135-7355-7809',
    '6461-6239-1512-8072-8338',
    '6709999639407938958',
    '6767-2952-1470-2154-617'
  ];

  before(function () {
    var obj = {};

    valid_ones.forEach(function (x) {
      obj[x] = x.replace(/\d$/, 'L');
    });

    faker.addLocale('credit_cards', {
      credit_card: obj
    });

    faker.setLocale('credit_cards');
  });

  it('credit_card should compute last digit', function () {
    valid_ones.forEach(function (x) {
      assert.equal(faker.Finance.creditCard(x), x);
    });
  });

  after(function () {
    faker.setLocale('en');
  });
});
