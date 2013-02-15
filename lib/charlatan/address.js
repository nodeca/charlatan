'use strict';

/**
 * class Charlatan.Address
 *
 **/


var Charlatan = require('../charlatan');


/**
 * Charlatan.Address.zipCode(format = null) -> String
 * - format (string): input format for example '#####-####'
 *
 * Generate zip code by from format. Each sharp symbol will be replaced by number.
 * If format is null, then random choise "#####" or '#####-####'
 *
 **/
/** alias of: Charlatan.Address.zipCode
 * Charlatan.Address.postcode() -> String
 **/
/** alias of: Charlatan.Address.zipCode
 * Charlatan.Address.zip() -> String
 **/
exports.postcode = exports.zip = exports.zipCode = function () {
  return Charlatan.letterify(Charlatan.numerify(Charlatan.fetch('address.postcode')));
};


/**
 * Charlatan.Address.city() -> String
 *
 * Generate city name. For example 'Port Marianashire'
 **/
exports.city = function () {
  return Charlatan.parse('address.city');
};


/**
 * Charlatan.Address.streetName() -> String
 *
 * Generate street name. For example 'Schuster borough'
 **/
exports.streetName = function () {
  return Charlatan.parse('address.street_name');
};


/**
 * Charlatan.Address.secondaryAddress() -> String
 *
 * Generate secodary address part Apt/Suite.
 **/
var secondaryAddress = exports.secondaryAddress = function () {
  return Charlatan.numerify(Charlatan.fetch('address.secondary_address'));
};


/**
 * Charlatan.Address.streetAddress(include_secondary = false) -> String
 * - include_secondary (boolean) : is need add apartment/suite part
 *
 * Generate street address. For example 'Schuster borough'
 **/
exports.streetAddress = function (include_secondary) {
  return Charlatan.numerify(Charlatan.parse('address.street_address') +
                (include_secondary ? ' ' + secondaryAddress() : ''));
};



/**
 * Charlatan.Address.state(abbr = false) -> String
 * - abbr (boolean): flag abbr or full name
 *
 * Return random state(or state abbr).
 **/
var state = exports.state = function (abbr) {
  return !!abbr ? Charlatan.fetch('address.state_abbr') :
                  Charlatan.fetch('address.state');
};


/**
 * Charlatan.Address.stateAbbr() -> String
 *
 * Return abbr of random state.
 **/
exports.stateAbbr = function () {
  return state(true);
};


/**
 * Charlatan.Address.county() -> String
 *
 * Return random county.
 * Note: if county dosen't set in current locale, then return empy string
 **/
exports.county = function () {
  try {
    return Charlatan.fetch('address.county');
  }
  catch (e) {
    return '';
  }
};


/**
 * Charlatan.Address.country() -> String
 *
 * Return random country
 **/
exports.country = function () {
  return Charlatan.fetch('address.country');
};


/**
 * Charlatan.Address.latitude() -> string
 *
 * Generate latitude
 **/
exports.latitude = function () {
  return ((Math.random() * 180) - 90).toString();
};


/**
 * Charlatan.Address.longitude() ->string
 *
 * Generate longitude
 **/
exports.longitude = function () {
  return ((Math.random() * 360) - 180).toString();
};
