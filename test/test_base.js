'use strict';

require('./_utils');

var assert = require('assert');
var faker = require('../');

describe('Base', function () {
  it('numerify', function () {
    for (var i = 0; i < 100; i++) {
      assert(faker.numerify('###').match(/[1-9]\d{2}/));
    }
  });

  it('letterify', function () {
    assert(faker.letterify('???').match(/[A-Z]{3}/));
  });

  it('regexify', function () {
    /*eslint-disable max-len*/
    var dict = {
      'uk post code': /^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/,
      'us phone': /^(1-?)[2-8][0-1][0-9]-\d{3}-\d{4}$/
    };

    Object.keys(dict).forEach(function (label) {
      var result;

      for (var i = 0; i < 10; i++) {
        result = faker.regexify(dict[label]);
        assert(dict[label].test(result), result + 'is not a match for ' + label);
      }
    });
  });
});
