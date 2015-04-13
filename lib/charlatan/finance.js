'use strict';

/**
 * class Charlatan.Finance
 **/


var Charlatan = require('../charlatan');
var Helpers   = require('./helpers');


var CREDIT_CARD_TYPES = [ 'visa', 'mastercard', 'discover', 'american_express',
  'diners_club', 'jcb', 'switch', 'solo', 'dankort', 'maestro',
  'forbrugsforeningen', 'laser' ];


/**
 * Charlatan.Finance.creditCard([types]) -> String
 *  - types(Array): generate card for one of these vendors ('visa', 'mastercard', etc.)
 *
 * Generate a card number with prefix belonging to one of the existing
 * payment processors.
 **/
exports.creditCard = function (types) {
  if (!types) {
    types = CREDIT_CARD_TYPES;
  }

  if (!Array.isArray(types)) {
    types = [ types ];
  }

  var type = Helpers.sample(types);
  var template = Charlatan.numerify(Charlatan.fetch('credit_card.' + type));

  // calculate the luhn checksum digit
  var multiplier = 1;
  var luhn_sum = template
      .replace(/[^0-9]/g, '')
      .split('')
      .reduceRight(function (sum, digit) {

    multiplier = (multiplier === 2 ? 1 : 2);
    return sum + Number(String(digit * multiplier)
        .split('')
        .reduce(function (a, b) { return Number(a) + Number(b); }));
  }, 0);

  // the sum plus whatever the last digit is must be a multiple of 10. So, the
  // last digit must be 10 - the last digit of the sum.
  var luhn_digit = (10 - (luhn_sum % 10)) % 10;

  return template.replace(/L/g, luhn_digit);
};
