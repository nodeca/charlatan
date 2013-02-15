'use strict';

/**
 * class Charlatan.Helpers
 *
 **/


/**
 * Charlatan.Helpers.rand(max, min = 0) -> Integer
 * - max (number): max value in range
 * - min (number): min value in range
 *
 * Returns a single random number based on a range
 **/
exports.rand = function (max, min) {
  if (!min) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};


/**
 * Charlatan.Helpers.sample(source) -> Mixin
 * - source(array): source array
 *
 * Returns random element from source array
 **/
exports.sample = function (source) {
  return source[this.rand(source.length)];
};


/**
 * Charlatan.Helpers.shuffle(source) -> Array
 * - source(array): source array
 *
 * Takes an array and returns it randomized
 **/
exports.shuffle = function (source) {
  var result = source.slice();
	var i, p, tmp;
  for (i = 0; i < source.length; i++) {
    p = parseInt(Math.random() * source.length, 10);
		tmp = result[i];
    result[i] = result[p];
    result[p] = tmp;
  }
	return result;
};


/**
 * Charlatan.Helpers.capitalize(str) -> String
 * - str(string): source string
 *
 * Capitalize first later
 **/
exports.capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
