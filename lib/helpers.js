'use strict';

/**
 * Helpers
 *
 **/


/**
 * Helpers#randomNumber(max, min = 0) -> Integer
 * - max (number): max value in range
 * - min (number): min value in range
 *
 * Returns a single random number based on a range
 **/
exports.randomNumber = function(max, min) {
  if (!min) {
    min = 0;
  }
  return Math.floor(Math.random()*(max - min)) + min;
};


/**
 * Helpers#sample(source) -> Mixin
 * - source(array): source array
 *
 * Returns random element from source array
 **/
exports.randomize = function(source) {
  return source[this.randomNumber(source.length)];
};


/** depricated
 * Helpers#randomize(source) -> Mixin
 * - source(array): source array
 *
 * Returns random element from source array.
 **/
exports.randomize = exports.sample;


/**
 * Helpers#replaceSymbolWithNumber(input, symbol = '#') -> String
 * - input (string): max value in range
 * - symbol (char): min value in range
 *
 * parses input string for a symbol and replace it with a random number from 1-10
 **/
exports.replaceSymbolWithNumber = function(input, symbol){
  var output = '';
  var i;

  if(symbol === undefined){
    symbol = '#';
  }

  for(i = 0; i < input.length; i++){
    if(input[i] === symbol){
      output += Math.floor(Math.random()*10);
    }
    else{
      output += input[i];
    }
  }
  return output;
};


/**
 * Helpers#shuffle(source) -> Array
 * - source(array): source array
 *
 * Takes an array and returns it randomized
 **/
exports.shuffle = function(source){
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
 * Helpers#capitalize(str) -> String
 * - str(string): source string
 *
 * Capitalize first later
 **/
exports.capitalize = function(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
};
