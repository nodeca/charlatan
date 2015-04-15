'use strict';

require('./_utils');

var assert = require('assert');
var faker = require('../');

describe('locale: en-CA', function () {
  before(function () {
    faker.setLocale('en-CA');
  });

  it('ca_postcode', function () {
    var expected = /[A-VX-Y][0-9][A-CEJ-NPR-TV-Z] ?[0-9][A-CEJ-NPR-TV-Z][0-9]/;
    assert(expected.test(faker.Address.postcode()));
  });

  after(function () {
    faker.setLocale(null);
  });
});
