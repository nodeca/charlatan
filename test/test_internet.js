'use strict';

/*eslint-disable no-loop-func*/

require('./_utils');

var assert = require('assert');
var tester = require('../').Internet;

describe('Internet', function () {
  it('email', function () {
    assert(tester.email().match(/.+@.+\.\w+/));
  });

  it('free_email', function () {
    assert(tester.freeEmail().match(/.+@(gmail|hotmail|yahoo)\.com/));
  });

  it('safe_email', function () {
    assert(tester.safeEmail().match(/.+@example.(com|net|org)/));
  });

  it('user_name', function () {
    assert(tester.userName().match(/[a-z]+((_|\.)[a-z]+)?/));
  });

  it('user_name_with_string_arg', function () {
    assert(tester.userName('bo peep').match(/(bo(_|\.)peep|peep(_|\.)bo)/));
  });

  it('user_name_with_integer_arg', function () {
    for (var i = 0; i < 32; i++) {
      assert(tester.userName(i).length >= i);
    }
  });

  it('password', function () {
    assert(tester.password().match(/\w{3}/));
  });

  it('password_with_integer_arg', function () {
    for (var i = 0; i < 32; i++) {
      assert(tester.password(i).length >= i);
    }
  });

  it('password_max_with_integer_arg', function () {
    for (var i = 0; i < 32; i++) {
      var j = i + 4;
      assert(tester.password(i, j).length <= j);
    }
  });

  it('domain_name', function () {
    assert(tester.domainName().match(/\w+\.\w+/));
  });

  it('domain_word', function () {
    assert(tester.domainWord().match(/^\w+$/));
  });

  it('domain_suffix', function () {
    assert(tester.domainSuffix().match(/^\w+(\.\w+)?/));
  });

  it('ip_v4_address', function () {
    assert.equal(4, tester.IPv4().split('.').length);

    var max = 0;

    for (var i = 0; i < 1000; i++) {
      tester.IPv4().split('.').forEach(function (h) {
        max = Math.max(parseInt(h, 10), max);
      });
    }

    assert(max <= 255);
  });

  it('mac_address', function () {
    assert.equal(6, tester.macAddress().split(':').length);
    assert.equal(6, tester.macAddress('').split(':').length);

    var max = 0;

    for (var i = 0; i < 1000; i++) {
      tester.macAddress().split(':').forEach(function (h) {
        max = Math.max(parseInt(h, 16), max);
      });
    }

    assert(max <= 255);

    assert.equal(0, tester.macAddress('fa:fa:fa').indexOf('fa:fa:fa'));
    assert.equal(0, tester.macAddress('01:02').indexOf('01:02'));
  });

  it('ip_v6_address', function () {
    assert.equal(8, tester.IPv6().split(':').length);

    var max = 0;

    for (var i = 0; i < 1000; i++) {
      tester.IPv6().split(':').forEach(function (h) {
        max = Math.max(parseInt(h, 16), max);
      });
    }

    assert(max <= 65535);
  });

  it('slug', function () {
    assert(tester.slug().match(/^[a-z]+(_|\.|\-)[a-z]+$/));
  });

  it('slug_with_content_arg', function () {
    assert(tester.slug('Foo bAr baZ').match(/^foo(_|\.|\-)bar(_|\.|\-)baz$/));
  });

  it('slug_with_glue_arg', function () {
    assert(tester.slug(null, '+').match(/^[a-z]+\+[a-z]+$/));
  });

  it('url', function () {
    assert(tester.url('domain.com', '/username').match(/^http:\/\/domain\.com\/username$/));
  });

  it('device_token', function () {
    assert.equal(64, tester.deviceToken().length);
  });
});
