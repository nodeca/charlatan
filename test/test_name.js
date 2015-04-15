'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').Name;

describe('Name', function () {
  it('name', function () {
    assert(tester.name().match(/(\w+\.? ?){2,3}/));
  });

  it('prefix', function () {
    assert(tester.prefix().match(/[A-Z][a-z]+\.?/));
  });

  it('suffix', function () {
    assert(tester.suffix().match(/[A-Z][a-z]*\.?/));
  });

  it('title', function () {
    assert(tester.title().match(/ /));
  });
});
