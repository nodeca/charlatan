'use strict';

/**
 * class Charlatan.PhoneNumber
 **/


var Charlatan = require('../charlatan');


/**
 * Charlatan.PhoneNumber.phoneNumber() -> String
 *
 * Generate phone number.
 **/
exports.phoneNumber = function () {
  return Charlatan.numerify(Charlatan.parse('phone_number.formats'));
};


/**
 * Charlatan.PhoneNumber.cellPhone() -> String
 *
 * Generate cell phone number.
 **/
exports.cellPhone = function () {
  return Charlatan.numerify(Charlatan.parse('cell_phone.formats'));
};


/**
 * Charlatan.PhoneNumber.areaCode() -> String
 *
 * Generate an area code (US only).
 **/
exports.areaCode = function () {
  return Charlatan.fetch('phone_number.area_code');
};


/**
 * Charlatan.PhoneNumber.exchangeCode() -> String
 *
 * Return an exchange code (US only).
 **/
exports.exchangeCode = function () {
  return Charlatan.fetch('phone_number.exchange_code');
};


/**
 * Charlatan.PhoneNumber.subscriberNumber(length=4) -> String
 *  - length(Integer): extension length
 *
 * Return a number extension (US only).
 *
 * Can be used for both extensions and last four digits of phone number.
 * Since extensions can be of variable length, this method takes a length parameter
 **/
exports.subscriberNumber = function (length) {
  if (typeof length !== 'number') {
    length = 4;
  }

  return Math.random().toFixed(length).slice(2);
};


/** alias of: Charlatan.PhoneNumber.subscriberNumber
 * Charlatan.PhoneNumber.extension() -> String
 **/
exports.extension = exports.subscriberNumber;
