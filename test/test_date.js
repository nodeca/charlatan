'use strict';

require('./_utils');

var assert = require('assert');
var tester = require('../').Date;

describe('Date', function () {
  it('between', function () {
    var from = Date.parse('2012-01-01');
    var to   = Date.parse('2013-01-01');

    for (var i = 0; i < 100; i++) {
      var random_date = tester.between(from, to);
      assert(random_date >= from);
      assert(random_date <= to);
    }
  });

  it('forward', function () {
    var today = Date.now();

    for (var i = 0; i < 100; i++) {
      var random_date = tester.forward(5);
      assert(random_date > today);
    }
  });

  it('backward', function () {
    var today = Date.now();

    for (var i = 0; i < 100; i++) {
      var random_date = tester.backward(5);
      assert(random_date < today);
    }
  });

  it('return_type', function () {
    var random_forward  = tester.forward(5);
    var random_backward = tester.backward(5);
    var random_between  = tester.between(Date.now(), Date.now() + 50000);

    [ random_forward, random_backward, random_between ].forEach(function (result) {
      assert.equal(Object.prototype.toString.call(result), '[object Date]');
    });
  });

  it('birthday', function () {
    var min = 40;
    var max = 90;
    for (var i = 0; i < 100; i++) {
      var t = new Date();
      var date_min = new Date(t.getFullYear() - min, t.getMonth(), t.getDay());
      var date_max = new Date(t.getFullYear() - max, t.getMonth(), t.getDay());
      var birthday = tester.birthday(min, max);
      assert(birthday > date_max);
      assert(birthday < date_min);
    }
  });

  it('default_birthday', function () {
    var min = 10;
    var max = 65;
    for (var i = 0; i < 100; i++) {
      var t = new Date();
      var date_min = new Date(t.getFullYear() - min, t.getMonth(), t.getDay());
      var date_max = new Date(t.getFullYear() - max, t.getMonth(), t.getDay());
      var birthday = tester.birthday();
      assert(birthday > date_max);
      assert(birthday < date_min);
    }
  });
});
