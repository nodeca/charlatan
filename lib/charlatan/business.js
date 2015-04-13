'use strict';

/**
 * class Charlatan.Business
 **/


var Charlatan = require('../charlatan');


/**
 * Charlatan.Business.creditCardNumber() -> String
 *
 * Generate placeholder credit card number (out of range of the real
 * credit card numbers).
 *
 * If you want to generate real-looking credit card numbers,
 * use [[Charlatan.Finance.creditCard]] method.
 **/
exports.creditCardNumber = function () {
  return Charlatan.fetch('business.credit_card_numbers');
};


/**
 * Charlatan.Business.creditCardExpiryDate() -> Date
 *
 * Generate credit card expire date
 **/
exports.creditCardExpiryDate = function () {
  return new Date(Charlatan.fetch('business.credit_card_expiry_dates'));
};


/**
 * Charlatan.Business.creditCardType() -> Date
 *
 * Generate credit card type (visa, mastercard, etc.)
 **/
exports.creditCardType = function () {
  return Charlatan.fetch('business.credit_card_types');
};
