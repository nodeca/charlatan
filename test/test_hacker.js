'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').Hacker;

describe('Hacker', function () {
  it('noun', function () {
    assert(tester.noun().match(/\w+/));
  });

  it('abbreviation', function () {
    assert(tester.abbreviation().match(/\w+/));
  });

  it('adjective', function () {
    assert(tester.adjective().match(/\w+/));
  });

  it('verb', function () {
    assert(tester.verb().match(/\w+/));
  });

  it('ingverb', function () {
    assert(tester.ingverb().match(/\w+/));
  });

  it('saySomethingSmart', function () {
    assert(tester.saySomethingSmart().match(/\w+/));
  });
});
