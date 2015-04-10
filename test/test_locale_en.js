'use strict';

/* globals it, describe */

require('./_utils');

var assert = require('assert');
var fs = require('fs');
var YAML = require('js-yaml');
var faker = require('../');

describe('locale: en', function () {
  it('us_states_only_include_states', function () {
    var data = YAML.safeLoad(fs.readFileSync(__dirname + '/../lib/locales/en.yml', 'utf8'));

    assert.equal(data.en.faker.address.state.length, 50);
    assert.equal(data.en.faker.address.state_abbr.length, 50);
  });

  it('us_zip_codes', function () {
    faker.setLocale('en-US');

    var expected = /\d{5}(\-\d{4})?/;
    assert(expected.test(faker.Address.zipCode()));

    faker.setLocale(null);
  });
});
