'use strict';

/**
 * class Charlatan.Address
 **/


var Charlatan = require('../charlatan');


/**
 * Charlatan.Address.zipCode([stateAbbr]) -> String
 * - state_abbr(String): use postcode ranges only for specified US state
 *
 * Generate zip code.
 **/
/** alias of: Charlatan.Address.zipCode
 * Charlatan.Address.postcode() -> String
 **/
/** alias of: Charlatan.Address.zipCode
 * Charlatan.Address.zip() -> String
 **/
exports.postcode = exports.zip = exports.zipCode = function (state_abbr) {
  if (!state_abbr) {
    return Charlatan.bothify(Charlatan.fetch('address.postcode'));
  }

  return Charlatan.bothify(Charlatan.fetch('address.postcode_by_state.' + state_abbr));
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
 * Charlatan.Address.streetAddress(include_secondary = false) -> String
 * - include_secondary(Boolean): add apartment/suite part
 *
 * Generate street address. For example 'Schuster borough'
 **/
exports.streetAddress = function (include_secondary) {
  return Charlatan.numerify(Charlatan.parse('address.street_address') +
                (include_secondary ? ' ' + exports.secondaryAddress() : ''));
};


/**
 * Charlatan.Address.secondaryAddress() -> String
 *
 * Generate secodary address part Apt/Suite.
 **/
exports.secondaryAddress = function () {
  return Charlatan.numerify(Charlatan.fetch('address.secondary_address'));
};


/**
 * Charlatan.Address.buildingNumber() -> String
 *
 * Generate building number.
 **/
exports.buildingNumber = function () {
  return Charlatan.bothify(Charlatan.fetch('address.building_number'));
};


/**
 * Charlatan.Address.timeZone() -> String
 *
 * Return random timeZone.
 **/
exports.timeZone = function () {
  return Charlatan.fetch('address.time_zone');
};


/**
 * Charlatan.Address.streetSuffix() -> String
 *
 * Return random street suffix.
 **/
exports.streetSuffix = function () {
  return Charlatan.fetch('address.street_suffix');
};


/**
 * Charlatan.Address.citySuffix() -> String
 *
 * Return random city suffix.
 **/
exports.citySuffix = function () {
  return Charlatan.fetch('address.city_suffix');
};


/**
 * Charlatan.Address.cityPrefix() -> String
 *
 * Return random city prefix.
 **/
exports.cityPrefix = function () {
  return Charlatan.fetch('address.city_prefix');
};


/**
 * Charlatan.Address.stateAbbr() -> String
 *
 * Return random state abbreviation.
 **/
exports.stateAbbr = function () {
  return Charlatan.fetch('address.state_abbr');
};


/**
 * Charlatan.Address.state() -> String
 *
 * Return random state name.
 **/
exports.state = function () {
  return Charlatan.fetch('address.state');
};



/**
 * Charlatan.Address.country() -> String
 *
 * Return random country.
 **/
exports.country = function () {
  return Charlatan.fetch('address.country');
};


/**
 * Charlatan.Address.countryCode() -> String
 *
 * Return random country code.
 **/
exports.countryCode = function () {
  return Charlatan.fetch('address.country_code');
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
