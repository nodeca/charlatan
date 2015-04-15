'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').Company;

describe('Company', function () {
  it('name', function () {
    assert(tester.name().match(/\w/));
  });

  it('suffix', function () {
    assert(tester.suffix().match(/\w/));
  });

  it('catch_phrase', function () {
    assert(tester.catchPhrase().match(/\w \w/));
  });

  it('bs', function () {
    assert(tester.bs().match(/\w \w/));
  });

  it('ein', function () {
    assert(tester.ein().match(/\d\d-\d\d\d\d\d\d\d/));
  });

  it('duns_number', function () {
    assert(tester.dunsNumber().match(/\d\d-\d\d\d-\d\d\d\d/));
  });

  it('logo', function () {
    assert(tester.logo().match(/http:\/\/pigment.github.io\/fake-logos\/logos\/medium\/color\/\d+\.png/));
  });
});
