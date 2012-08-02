'use strict';

/**
 * class Name
 *
 **/


var Helpers = require('./helpers');
var definitions = require('./definitions');


/**
 * Name#name(include_prefix = null, include_suffix = null) -> String
 * - include_prefix (boolean): add name prefix such as "Mr."/"Mrs.". If null, then 1/8 chance of adding.
 * - include_suffix (boolean): add name suffix such as "I"/ "II". If null, then 1/8 chance of adding.
 *
 * Generate full name.
 **/
exports.name = function(include_prefix, include_suffix) {
  var name = '';

  if (include_prefix === undefined || include_prefix === null) {
    include_prefix = (Helpers.randomNumber(8) === 0);
  }
  if (include_suffix === undefined || include_suffix === null) {
    include_suffix = (Helpers.randomNumber(8) === 0);
  }

  if (include_prefix) {
    name += Helpers.randomize(definitions.name_prefix()) + " ";
  }
  name += Helpers.randomize(definitions.first_name()) + " " +
    Helpers.randomize(definitions.last_name());

  if (include_suffix) {
    name += " " + Helpers.randomize(definitions.name_suffix());
  }
  return name;
};


/**
 * Name#firstName() -> String
 *
 * Generate first name. Example: 'Marjorie'
 **/
exports.firstName = function () {
  return Helpers.randomize(definitions.first_name());
};


/**
 * Name#lastName() -> String
 *
 * Generate last name. Example: 'Lemke'
 **/
exports.lastName = function () {
  return Helpers.randomize(definitions.last_name());
};
