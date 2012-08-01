'use strict';

/**
 * class PhoneNumber
 *
 **/


var Helpers = require('./helpers');
var definitions = require('./definitions');

/**
 * PhoneNumber#phoneNumber(format = null) -> String
 * - format (string): input format for example '#####-####'
 *
 * Generate phone number by format. Each sharp symbol will be replaced by number.
 * If format is null, then randomly
 **/
exports.phoneNumber = function ( format ){
  if (!format) {
    format = Helpers.randomize(definitions.phone_formats());
  }
  return Helpers.replaceSymbolWithNumber(format);
};
