'use strict';

/**
 * class Charlatan.Business
 *
 **/


var Charlatan = require('../charlatan');

/**
 * Charlatan.Business.creditCardNumber() -> String
 *
 * Generate credit card number
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
 * Generate credit card type (visa, mastercard and etc.)
 **/
exports.creditCardType = function () {
  return Charlatan.fetch('business.credit_card_types');
};
