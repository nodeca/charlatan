'use strict';

require('./_utils');

var assert = require('assert');
var faker = require('../');
var tester = require('../').Commerce;

describe('Commerce', function () {
  it('color', function () {
    assert(tester.color().match(/[a-z]+\.?/));
  });

  it('department', function () {
    assert(tester.department().match(/[A-Z][a-z]+\.?/));
  });

  it('single_department_should_not_contain_separators', function () {
    assert(/^[A-Za-z]+$/.test(tester.department(1)));
  });

  it('department_should_have_ampersand_as_default_separator', function () {
    assert(/ & /.test(tester.department(2, true)));
  });

  it('department_should_accept_localized_separator', function () {
    faker.addLocale('xy', {
      separator: ' + ',
      commerce: {
        department: [ 'Books', 'Movies' ]
      }
    });

    faker.setLocale('xy');
    assert(/ \+ /.exec(tester.department(2, true)));
    faker.setLocale(null);
  });

  it('department_should_have_exact_number_of_categories_when_fixed_amount', function () {
    assert(/^([A-Za-z]+, ){8}[A-Za-z]+ & [A-Za-z]+$/.exec(tester.department(10, true)));
  });

  it('department_should_never_exceed_the_max_number_of_categories_when_random_amount', function () {
    for (var i = 0; i < 100; i++) {
      assert(/^([A-Za-z]+(, | & )){0,5}[A-Za-z]+$/.exec(tester.department(6)));
    }
  });

  it('department_should_have_no_duplicate_categories', function () {
    function uniq(arr) {
      var h = {};
      arr.forEach(function (i) {
        h[i] = 1;
      });
      return Object.keys(h);
    }

    var department = tester.department(10, true);

    var departments = department.split(/[,& ]+/);
    assert.deepEqual(departments.sort(), uniq(departments).sort());
  });

  it('product_name', function () {
    assert(tester.productName().match(/[A-Z][a-z]+\.?/));
  });

  it('price', function () {
    var p = tester.price();

    assert(0 <= p && p < 100);
  });

  it('price_is_float', function () {
    assert.equal(typeof tester.price(), 'number');
  });
});
