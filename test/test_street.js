'use strict';

require('./_utils');

var assert = require('assert');
var faker = require('../');

describe('street', function () {
  before(function () {
    faker.addLocale('shire', {
      address: {
        street_name: [ '#{street_prefix} #{street_root} #{street_suffix}' ],
        street_prefix: [ 'Wide' ],
        street_root: [ 'Cheerful' ],
        street_suffix: [ 'Path' ],
        secondary_address: [ '(Green Door)' ],
        street_address: [ '#{street_name} #{building_number}' ],
        building_number: [ '#' ],
        time_zone: [ 'Pacific/Pago_Pago' ]
      }
    });
  });

  beforeEach(function () {
    faker.setLocale('shire');
  });

  it('street_name_supports_flexible_formats', function () {
    assert.equal('Wide Cheerful Path', faker.Address.streetName());
  });

  it('street_address_supports_flexible_formats', function () {
    assert(/Wide Cheerful Path \d/.exec(faker.Address.streetAddress()));
  });

  it('street_address_optionally_provides_secondary_address', function () {
    assert(/Wide Cheerful Path \d \(Green Door\)/.exec(faker.Address.streetAddress(true)));
  });

  it('street_address_with_locale_fallback', function () {
    faker.setLocale('en-GB');
    assert(/^\d+ [\w']+ \w+/.exec(faker.Address.streetAddress()));
  });

  it('timezone_support', function () {
    assert.equal('Pacific/Pago_Pago', faker.Address.timeZone());
  });

  after(function () {
    faker.setLocale(null);
  });
});
