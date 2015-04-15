'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').App;

describe('App', function () {
  it('author', function () {
    assert(tester.author().match(/(\w+\.? ?){2,3}/));
  });

  it('version', function () {
    assert(tester.version().match(/\d/));
  });

  it('name', function () {
    assert(tester.name().match(/\w/));
  });
});
