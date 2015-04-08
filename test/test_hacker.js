'use strict';

/* globals it, describe */

var assert = require('assert');
var hacker = require('../').Hacker;

describe('Hacker', function () {
  it('noun', function () {
    assert(hacker.noun().match(/\w+/));
  });
  
  it('abbreviation', function () {
    assert(hacker.abbreviation().match(/\w+/));
  });
  
  it('adjective', function () {
    assert(hacker.adjective().match(/\w+/));
  });
  
  it('verb', function () {
    assert(hacker.verb().match(/\w+/));
  });
  
  it('ingverb', function () {
    assert(hacker.ingverb().match(/\w+/));
  });
  
  it('saySomethingSmart', function () {
    assert(hacker.saySomethingSmart().match(/\w+/));
  });
});
