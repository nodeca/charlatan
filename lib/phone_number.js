'use strict';

/**
 * PhoneNumber
 *
 **/


var Helpers = require('./helpers');
var Charlatan = require('./charlatan');


/**
 * PhoneNumber#phoneNumber() -> String
 *
 * Generate phone number.
 **/
exports.phoneNumber = function() {
  return Charlatan.numerify(Charlatan.fetch('phone_number.formats'));
};


/**
 * PhoneNumber#phoneNumber() -> String
 *
 * Generate cell phone number. If locale hasn't `cell_phone` section then use `phone`.
 **/
exports.cellPhone = function() {
  try {
    Charlatan.numerify(Charlatan.fetch('phone_number.cell_phone'));
  }
  catch (e) {
    return exports.phoneNumber();
  }
};
