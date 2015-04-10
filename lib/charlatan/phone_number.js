'use strict';

/**
 * class Charlatan.PhoneNumber
 *
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


// US only
exports.areaCode = function () {
  return Charlatan.fetch('phone_number.area_code');
};


// US only
exports.exchangeCode = function () {
  return Charlatan.fetch('phone_number.exchange_code');
};


// US only
// Can be used for both extensions and last four digits of phone number.
// Since extensions can be of variable length, this method taks a length parameter
exports.subscriberNumber = function (length) {
  if (typeof length !== 'number') {
    length = 4;
  }

  return Math.random().toFixed(length).slice(2);
};


// alias
exports.extension = exports.subscriberNumber;
