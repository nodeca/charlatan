'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').Team;

describe('Team', function () {
  it('name', function () {
    assert(tester.name().match(/(\w+\.? ?){2}/));
  });

  it('creature', function () {
    assert(tester.creature().match(/\w+/));
  });

  it('state', function () {
    assert(tester.state().match(/\w+/));
  });
});
