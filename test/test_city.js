'use strict';

require('./_utils');

var assert = require('assert');
var faker = require('../');

describe('city', function () {
  before(function () {
    faker.addLocale('xx', {
      name: {
        first_name: [ 'alice' ],
        last_name: [ 'smith' ]
      },
      address: {
        city_prefix: [ 'west' ],
        city_suffix: [ 'burg' ]
      }
    });

    faker.addLocale('xy', {
      address: {
        city_prefix: [ 'big' ],
        city_root: [ 'rock' ],
        city_root_suffix: [ 'ing' ],
        city_suffix: [ 'town' ],
        city: [ '#{city_prefix} #{city_root}#{city_root_suffix} #{city_suffix}' ]
      }
    });
  });

  it('default_city_formats', function () {
    faker.setLocale('xx');

    for (var i = 0; i < 1000; i++) {
      var cities = [ 'west alice', 'west smith', 'west aliceburg', 'west smithburg', 'aliceburg', 'smithburg' ];
      var city = faker.Address.city();

      assert(cities.indexOf(city) !== -1);
    }
  });

  it('city_formats_are_flexible', function () {
    faker.setLocale('xy');

    var cities = [ 'big rocking town' ];
    var city = faker.Address.city();

    assert(cities.indexOf(city) !== -1);
  });

  after(function () {
    faker.setLocale(null);
  });
});
