'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').Code;

describe('Code', function () {
  it('default_isbn_regexp', function () {
    assert(tester.isbn().match(/^\d{9}-[\d|X]$/));
  });

  it('default_isbn13_regexp', function () {
    assert(tester.isbn(13).match(/^\d{12}-\d$/));
  });

  it('default_ean_regexp', function () {
    assert(tester.ean().match(/^\d{13}$/));
  });

  it('default_ean8_regexp', function () {
    assert(tester.ean(8).match(/^\d{8}$/));
  });

  it('rut', function () {
    assert(tester.rut().match(/^\d{1,8}-(\d|k)$/));
  });
});
