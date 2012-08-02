'use strict';

/**
 * Address
 *
 **/


var Helpers = require('./helpers');
var definitions = require('../lib/definitions');


/**
 * Address#zipCode(format = null) -> String
 * - format (string): input format for example '#####-####'
 *
 * Generate zip code by from format. Each sharp symbol will be replaced by number.
 * If format is null, then random choise "#####" or '#####-####'
 *
 **/
exports.zipCode = function (format) {
  if (!format) {
    format = Helpers.randomize(["#####", '#####-####']);
  }
  return Helpers.replaceSymbolWithNumber(format);
};


/**
 * Address#city() -> String
 *
 * Generate city name. For example 'Port Marianashire'
 **/
exports.city = function() {
  var prefix = definitions.city_prefix();
  var name = definitions.first_name();
  var suffix = definitions.city_suffix();
  switch(Helpers.randomNumber(3)) {
    case 0:
      return Helpers.randomize(prefix) + " " +
              Helpers.randomize(name) +
              Helpers.randomize(suffix);
    case 1:
      return Helpers.randomize(prefix) + " " +
              Helpers.randomize(name);
    case 2:
      return Helpers.randomize(name) +
              Helpers.randomize(suffix);
    case 3:
      return Helpers.randomize(name) +
              Helpers.randomize(suffix);
  }
};


/**
 * Address#streetName() -> String
 *
 * Generate street name. For example 'Schuster borough'
 **/
exports.streetName = function() {
  var first_name = definitions.first_name();
  var last_name = definitions.last_name();
  var suffix = definitions.city_suffix();
  if (Helpers.randomNumber(1) === 0) {
      return Helpers.randomize(last_name) + " " +
        Helpers.randomize(suffix);
  }
  return Helpers.randomize(first_name) + " " +
          Helpers.randomize(suffix);
};


/**
 * Address#streetAddress(include_secondary = false) -> String
 * - include_secondary (boolean) : is need add apartment/suite part
 *
 * Generate street address. For example 'Schuster borough'
 **/
exports.streetAddress = function(include_secondary) {
  var address = "";
  var symbols;

  if( include_secondary === undefined){
    include_secondary = false;
  }


  symbols = new Array(Helpers.randomNumber(3) + 2).join('#');
  address = Helpers.replaceSymbolWithNumber(symbols) + " " + this.streetName();
  if (include_secondary) {
    return address + " " + this.secondaryAddress();
  }
  return address;
};


/**
 * Address#secondaryAddress() -> String
 *
 * Generate secodary address part Apt/Suite.
 **/
exports.secondaryAddress = function() {
  var symbols =  new Array(Helpers.randomNumber(4) + 1).join('#');
  var string = Helpers.randomize([
    'Apt. ' + symbols,
    'Suite ' + symbols
  ]);
  return Helpers.replaceSymbolWithNumber(string);
};


/**
 * Address#brState(abbr) -> String
 * - abbr (boolean): flag abbr or full name
 *
 * Return random Brasilian state(or state abbr).
 **/
exports.brState = function( abbr ) {
  return Helpers.randomize( definitions[ abbr ? 'br_state_abbr' : 'br_state']() );
};


/**
 * Address#ukCounty() -> String
 *
 * Return random United Kingdom county
 **/
exports.ukCounty = function(){
  return Helpers.randomize(definitions.uk_county());
};


/**
 * Address#ukCountry() -> String
 *
 * Return random United Kingdom country
 **/
exports.ukCountry = function(){
  return Helpers.randomize(definitions.uk_country());
};


/**
 * Address#ukState(abbr) -> String
 * - abbr (boolean): flag abbr or full name
 *
 * Return random USA state( or state abbr)
 **/
exports.usState = function( abbr ) {
  return Helpers.randomize( definitions[ abbr ? 'us_state_abbr' : 'us_state']() );
};
