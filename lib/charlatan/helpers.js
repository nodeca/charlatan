'use strict';

/**
 * class Charlatan.Helpers
 **/

var titleizeSmallWords = [ 'a', 'an', 'and', 'as', 'at', 'but', 'by',
      'en', 'for', 'if', 'in', 'of', 'on', 'or', 'the', 'to', 'v',
      'v.', 'via', 'vs', 'vs.' ];

/**
 * Charlatan.Helpers.rand(max, min = 0) -> Integer
 * - max (number): max value in range (exclusive)
 * - min (number): min value in range (inclusive)
 *
 * Returns a single random number in range `[min, max)`,
 * including `min` but excluding `max`.
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
  return source[exports.rand(source.length)];
};


/**
 * Charlatan.Helpers.shuffle(source) -> Array
 * - source(array): source array
 *
 * Takes an array and returns it randomized
 **/
exports.shuffle = function (source) {
  var result = source.slice(),
      i, p, tmp;

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
 * Capitalize first letter
 **/
var capitalize = exports.capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


/**
 * Charlatan.Helpers.titleize() -> String
 * - title(string): source string
 *
 * Capitalizes most words to create a nicer looking title string.
 * The list of "small words" which are not capped comes from
 * the New York Times Manual of Style, plus 'vs' and 'v'.
 **/
exports.titleize = function (title) {
  var i;
  var words = title.toLowerCase().split(' ');

  // first word is always capitalised
  words[0] = capitalize(words[0]);

  for (i = 1; i < words.length; i++) {
    if (titleizeSmallWords.indexOf(words[i]) === -1) {
      words[i] = capitalize(words[i]);
    }
  }
  return words.join(' ');
};


/**
 * Charlatan.Helpers.range(from, to) -> String | Number
 * - from(String | Number): starting character
 * - to(String | Number): ending character
 *
 * Return all numbers or characters from `from` to `to`.
 *
 * If input values are strings, this method returns strings,
 * if they are numbers, it will return a number array.
 *
 * For example, `range("A", "D")` will return `["A", "B", "C", "D"]`.
 **/
exports.range = function (from, to) {
  var i, stringify = false, result = [];

  if (typeof from === 'string' && typeof to === 'string') {
    stringify = true;
    from = from.charCodeAt(0);
    to = to.charCodeAt(0);
  }

  for (i = from; i <= to; i++) {
    result.push(i);
  }

  return stringify ?
         result.map(function (x) { return String.fromCharCode(x); }) :
         result;
};
