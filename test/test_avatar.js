'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').Avatar;

describe('Avatar', function () {
  it('avatar', function () {
    assert(tester.image().match(/http:\/\/robohash\.org\/(.+)\.png/)[1]);
  });

  it('avatar_with_param', function () {
    assert(tester.image('faker').match(/http:\/\/robohash\.org\/(.+)\.png/)[1]);
  });

  it('avatar_with_correct_size', function () {
    assert.equal(tester.image('faker', '150x320').match(/http:\/\/robohash\.org\/faker\.png\?size=(.+)/)[1], '150x320');
  });

  it('avatar_with_incorrect_size', function () {
    assert.throws(function () {
      tester.image(null, '150x320z');
    }, /Size should be specified in format/);
  });

  it('avatar_with_supported_format', function () {
    assert(tester.image('faker', '300x300', 'jpg').match(/http:\/\/robohash\.org\/faker\.jpg/));
  });

  it('avatar_with_incorrect_format', function () {
    assert.throws(function () {
      tester.image(null, '300x300', 'wrong_format');
    }, /Supported formats are/);
  });
});
