'use strict';

require('./_utils');

var assert = require('assert');
var Charlatan = require('../');
var tester = require('../').Business;

describe('Business', function () {
  var credit_card_number_list = Charlatan.translate('business.credit_card_numbers');
  var credit_card_number_expiry_dates = Charlatan.translate('business.credit_card_expiry_dates');
  var credit_card_types = Charlatan.translate('business.credit_card_types');

  it('credit_card_number', function () {
    var number1 = tester.creditCardNumber();
    var number2 = tester.creditCardNumber();
    assert(credit_card_number_list.indexOf(number1) !== -1);
    assert(credit_card_number_list.indexOf(number2) !== -1);
  });

  it('credit_card_expiry_date', function () {
    var date1 = Date.parse(tester.creditCardExpiryDate());
    var date2 = Date.parse(tester.creditCardExpiryDate());
    assert(credit_card_number_expiry_dates.map(Date.parse).indexOf(date1) !== -1);
    assert(credit_card_number_expiry_dates.map(Date.parse).indexOf(date2) !== -1);
  });

  it('credit_card_type', function () {
    var type1 = tester.creditCardType();
    var type2 = tester.creditCardType();
    assert(credit_card_types.indexOf(type1) !== -1);
    assert(credit_card_types.indexOf(type2) !== -1);
  });
});
