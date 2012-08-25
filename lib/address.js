'use strict';

/**
 * Address
 *
 **/


var Helpers = require('./helpers');
var Charlatan = require('./charlatan');


/** alias of zip, postcode
 * Address#zipCode(format = null) -> String
 * - format (string): input format for example '#####-####'
 *
 * Generate zip code by from format. Each sharp symbol will be replaced by number.
 * If format is null, then random choise "#####" or '#####-####'
 *
 **/
exports.postcode = exports.zip = exports.zipCode = function (format) {
  return Charlatan.letterify(Charlatan.numerify(Charlatan.fetch('address.postcode')));
};


/**
 * Address#city() -> String
 *
 * Generate city name. For example 'Port Marianashire'
 **/
exports.city = function() {
  return Charlatan.parse('address.city');
};


/**
 * Address#streetName() -> String
 *
 * Generate street name. For example 'Schuster borough'
 **/
exports.streetName = function() {
  return Charlatan.parse('address.street_name');
};


/**
 * Address#secondaryAddress() -> String
 *
 * Generate secodary address part Apt/Suite.
 **/
var secondaryAddress = exports.secondaryAddress = function() {
  return Charlatan.numerify(Charlatan.fetch('address.secondary_address'));
};


/**
 * Address#streetAddress(include_secondary = false) -> String
 * - include_secondary (boolean) : is need add apartment/suite part
 *
 * Generate street address. For example 'Schuster borough'
 **/
exports.streetAddress = function(include_secondary) {
  return Charlatan.numerify(Charlatan.parse('address.street_address') +
                (include_secondary ? ' ' + secondaryAddress() : ''));
};



/**
 * Address#state(abbr = false) -> String
 * - abbr (boolean): flag abbr or full name
 *
 * Return random state(or state abbr).
 **/
var state = exports.state = function( abbr ) {
  if (!!abbr) {
    return Charlatan.fetch('address.state_abbr');
  }
  else {
    return Charlatan.fetch('address.state');
  }
};


/**
 * Address#stateAbbr() -> String
 *
 * Return random state abbr.
 **/
exports.stateAbbr = function() {
  return state(true);
};


/**
 * Address#county() -> String
 *
 * Return random county.
 * Note: if county dosen't set in current locale, then return empy string
 **/
exports.county = function(){
  try {
    return Charlatan.fetch('address.county');
  }
  catch (e) {
    return '';
  }
};


/**
 * Address#country() -> String
 *
 * Return random country
 **/
exports.country = function(){
  return Charlatan.fetch('address.country');
};
