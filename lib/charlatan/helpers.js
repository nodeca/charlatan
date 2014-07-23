'use strict';

/**
 * class Charlatan.Helpers
 *
 **/

var titleizeSmallWords = ["a", "an", "and", "as", "at", "but", "by"
    ,"en", "for", "if", "in", "of", "on", "or", "the", "to", "v"
    ,"v.", "via", "vs", "vs."];

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
  var words = title.toLowerCase().split(" ");

  // first word always capitolised
  words[0] = capitalize(words[0]);

  for (i = 1; i < words.length; i++) {
    if (titleizeSmallWords.indexOf(words[i]) === -1) {
      words[i] = capitalize(words[i]);
    }
  }
  return words.join(" ");
}
