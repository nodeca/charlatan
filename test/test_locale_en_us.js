'use strict';

require('./_utils');

var assert = require('assert');
var faker = require('../');

describe('locale: en-US', function () {
  afterEach(function () {
    faker.setLocale(null);
  });

  it('us_phone_methods_return_nil_for_nil_locale', function () {
    assert.equal(faker.PhoneNumber.area_code, null);
    assert.equal(faker.PhoneNumber.exchange_code, null);
  });

  it('subscriber_number_method', function () {
    assert.equal(typeof faker.PhoneNumber.subscriberNumber(), 'string');
    assert.equal(faker.PhoneNumber.subscriberNumber().length, 4);
    assert.equal(faker.PhoneNumber.subscriberNumber(10).length, 10);
    assert.equal(faker.PhoneNumber.extension, faker.PhoneNumber.subscriberNumber);
  });

  it('us_phone_methods_with_en_us_locale', function () {
    faker.setLocale('en-US');

    assert.equal(typeof faker.PhoneNumber.areaCode(), 'string');
    assert(!Number.isNaN(+faker.PhoneNumber.areaCode()));
    assert.equal(faker.PhoneNumber.areaCode().length, 3);

    assert.equal(typeof faker.PhoneNumber.exchangeCode(), 'string');
    assert(!Number.isNaN(+faker.PhoneNumber.exchangeCode()));
    assert.equal(faker.PhoneNumber.exchangeCode().length, 3);
  });

  it('validity_of_phone_method_output', function () {
    faker.setLocale('en-US');

    /*eslint-disable max-len*/
    // got the following regex from http://stackoverflow.com/a/123666/1210055 as an expression of the NANP standard.
    var us_number_validation_regex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    assert(us_number_validation_regex.test(faker.PhoneNumber.phoneNumber()));
  });

  it('us_invalid_state_raises_exception', function () {
    faker.setLocale('en-US');

    assert.throws(function () {
      faker.Address.zipCode('NA');
    }, /Invalid path/);
  });

  it('us_zip_codes_match_state', function () {
    faker.setLocale('en-US');

    var state_abbr = 'AZ';
    var expected = /^850\d\d$/;
    assert(expected.test(faker.Address.zipCode(state_abbr)));

    // disjointed ranges for these states
    // http://www.fincen.gov/forms/files/us_state_territory_zip_codes.pdf
    state_abbr = 'AR';
    expected = /^717\d\d$/;
    assert(expected.test(faker.Address.zipCode(state_abbr)));
    state_abbr = 'GA';
    expected = /^301\d\d$/;
    assert(expected.test(faker.Address.zipCode(state_abbr)));
    state_abbr = 'MA';
    expected = /^026\d\d$/;
    assert(expected.test(faker.Address.zipCode(state_abbr)));
    state_abbr = 'NY';
    expected = /^122\d\d$/;
    assert(expected.test(faker.Address.zipCode(state_abbr)));
    state_abbr = 'TX';
    expected = /^798\d\d$/;
    assert(expected.test(faker.Address.zipCode(state_abbr)));
    state_abbr = 'VA';
    expected = /^222\d\d$/;
    assert(expected.test(faker.Address.zipCode(state_abbr)));
  });
});
