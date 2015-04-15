'use strict';

/**
 * class Charlatan.Number
 **/

var Helpers = require('./helpers');


/**
 * Charlatan.Number.number(digits) -> String
 *  - digits(Number): an amount of digits in there
 *
 * Generate a base 10 number
 **/
exports.number = function (digits) {
  var result = '';

  for (var i = 0; i < digits; i++) {
    result += Helpers.rand(10, 0).toString(10);
  }

  return result;
};


/**
 * Charlatan.Number.decimal(l_digits, r_digits=2) -> String
 *  - l_digits(Number): an amount of digits in the integer part
 *  - r_digits(Number): an amount of digits in the fractional part
 *
 * Generate a decimal number
 **/
exports.decimal = function (l_digits, r_digits) {
  if (typeof r_digits !== 'number') {
    r_digits = 2;
  }

  return exports.number(l_digits) + '.' + exports.number(r_digits);
};


/**
 * Charlatan.Number.digit() -> String
 *
 * Generate a base 10 digit
 **/
exports.digit = function () {
  return String(Helpers.rand(10, 0));
};


/**
 * Charlatan.Number.hexadecimal(digits) -> String
 *  - digits(Number): an amount of digits in there
 *
 * Generate a base 16 number
 **/
exports.hexadecimal = function (digits) {
  var result = '';

  for (var i = 0; i < digits; i++) {
    result += Helpers.rand(16, 0).toString(16);
  }

  return result;
};


/**
 * Charlatan.Number.between(from=1, to=5000) -> Number
 *  - from(Number): range start
 *  - to(Number): range end
 *
 * Generate a number between `from` and `to`
 **/
exports.between = function (from, to) {
  if (typeof from !== 'number') {
    from = 1;
  }

  if (typeof to !== 'number') {
    to = 5000;
  }

  return Helpers.rand(Math.max(from, to) + 1, Math.min(from, to));
};


/**
 * Charlatan.Number.positive(from=1, to=5000) -> Number
 *  - from(Number): range start
 *  - to(Number): range end
 *
 * Generate a positive number between `from` and `to`
 **/
exports.positive = function (from, to) {
  if (typeof from !== 'number') {
    from = 1;
  }

  if (typeof to !== 'number') {
    to = 5000;
  }

  return Math.abs(exports.between(from, to));
};


/**
 * Charlatan.Number.negative(from=-5000, to=-1) -> Number
 *  - from(Number): range start
 *  - to(Number): range end
 *
 * Generate a negative number between `from` and `to`
 **/
exports.negative = function (from, to) {
  if (typeof from !== 'number') {
    from = -5000;
  }

  if (typeof to !== 'number') {
    to = -1;
  }

  return -Math.abs(exports.between(from, to));
};
