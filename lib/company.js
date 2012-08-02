'use strict';

/**
 * Company
 **/

var Helpers = require('./helpers');
var definitions = require('../lib/definitions');


/**
 * Company#name(format = null) -> String
 * - format (integer): code of name format, randomly by default
 *
 * Genreate company name by format
 *
 * ##### Formats:
 * - `0` Last name plus suffix (Inc, LLC..). Example: Lowe LLC
 * - `1` Double last name hyphenated. Example: Connelly-Nienow
 * - `2` Three last name. Example: Smith, Smith and Wesson
 *
 **/
exports.name = function ( format ) {
  var last_name = definitions.last_name();
  switch( ( format ? format : Helpers.randomNumber(3) ) )
  {
    case 0:
      return Helpers.randomize(last_name) + " " +
              this.suffix();
    case 1:
      return Helpers.randomize(last_name) + "-" +
              Helpers.randomize(last_name) ;
    case 2:
      return Helpers.randomize(last_name) + "," +
              Helpers.randomize(last_name) + " and " +
              Helpers.randomize(last_name);
  }
};


/**
 * Company#suffix() -> String
 *
 * Return random suffix frim list:
 *    "Inc", "and Sons", "LLC", "Group", "and Daughters"
 *
 **/
exports.suffix = function() {
  return Helpers.randomize(["Inc", "and Sons", "LLC", "Group", "and Daughters"]);
};

/**
 * Company#catchPhrase() -> String
 *
 * Generate catch phrase adjective + descriptor + noun
 **/
exports.catchPhrase = function() {
  return Helpers.randomize(definitions.catch_phrase_adjective()) + " " +
          Helpers.randomize(definitions.catch_phrase_descriptor()) + " "+
          Helpers.randomize(definitions.catch_phrase_noun());
};


/**
 * Company#bs() -> String
 *
 * Generate bullshet (adjective + buzz + noun)
 **/
exports.bs = function() {
  return Helpers.randomize(definitions.bs_adjective()) + " " +
          Helpers.randomize(definitions.bs_buzz()) + " "+
          Helpers.randomize(definitions.bs_noun());
};
