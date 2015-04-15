'use strict';

/**
 * class Charlatan.Date
 **/

var Helpers = require('./helpers');


/**
 * Charlatan.Date.between(from, to) -> Date
 *  - from(Number | String | Date): start of the interval
 *  - to(Number | String | Date): end of the interval
 *
 * Generate a random date in the given interval.
 **/
exports.between = function (from, to) {
  from = typeof from === 'number' ? from : Date.parse(from);
  to = typeof to === 'number' ? to : Date.parse(to);

  return new Date(Helpers.rand(Math.max(from, to) + 1, Math.min(from, to)));
};


/**
 * Charlatan.Date.forward(days=365) -> Date
 *  - days(Number): maximum amount of days after this one
 *
 * Generate a random date after current one.
 **/
exports.forward = function (days) {
  if (typeof days !== 'number') {
    days = 365;
  }

  var from = Date.now() + 24 * 60 * 60 * 1000;
  var to   = Date.now() + 24 * 60 * 60 * 1000 * days;

  return exports.between(from, to);
};


/**
 * Charlatan.Date.backward(days=365) -> Date
 *  - days(Number): maximum amount of days before this one
 *
 * Generate a random date before current one.
 **/
exports.backward = function (days) {
  if (typeof days !== 'number') {
    days = 365;
  }

  var from = Date.now() - 24 * 60 * 60 * 1000;
  var to   = Date.now() - 24 * 60 * 60 * 1000 * days;

  return exports.between(from, to);
};


/**
 * Charlatan.Date.birthday(min_age=18, max_age=65) -> Date
 *  - min_age(Number): min age
 *  - max_age(Number): max age
 *
 * Generate a random birthday for people of given age.
 **/
exports.birthday = function (min_age, max_age) {
  if (typeof min_age !== 'number') {
    min_age = 18;
  }

  if (typeof max_age !== 'number') {
    max_age = 65;
  }

  var t    = new Date();
  var from = new Date(t.getFullYear() - min_age, t.getMonth(), t.getDay());
  var to   = new Date(t.getFullYear() - max_age, t.getMonth(), t.getDay());

  return exports.between(from, to);
};
