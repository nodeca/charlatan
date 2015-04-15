'use strict';

/**
 * class Charlatan.Code
 **/

var Charlatan = require('../charlatan');


function generate_base10_isbn() {
  var values = Charlatan.regexify(/\d{9}/);
  var remainder = values.split('').reduce(function (acc, ch, i) {
    return acc + Number(ch) * (10 - i);
  }, 0);

  remainder = (11 - (remainder % 11)) % 11;
  return values + '-' + String(remainder === 10 ? 'X' : remainder);
}

function generate_base13_isbn() {
  var values = Charlatan.regexify(/\d{12}/);
  var remainder = values.split('').reduce(function (acc, ch, i) {
    return acc + (i % 2 ? 3 : 1) * Number(ch);
  }, 0);

  remainder = (10 - (remainder % 10)) % 10;
  return values + '-' + String(remainder);
}

function generate_base8_ean() {
  var values = Charlatan.regexify(/\d{7}/);
  var remainder = values.split('').reduce(function (acc, ch, i) {
    return acc + (i % 2 ? 1 : 3) * Number(ch);
  }, 0);

  remainder = (10 - (remainder % 10)) % 10;
  return values + String(remainder);
}

function generate_base13_ean() {
  var values = Charlatan.regexify(/\d{12}/);
  var remainder = values.split('').reduce(function (acc, ch, i) {
    return acc + (i % 2 ? 3 : 1) * Number(ch);
  }, 0);

  remainder = (10 - (remainder % 10)) % 10;
  return values + String(remainder);
}

function rut_verificator_digit(rut) {
  var verif_digits = '3 2 7 6 5 4 3 2'.split(' ');

  var total = ('00000000' + rut).slice(-8).split('').reduce(function (acc, ch, i) {
    return acc + ch * verif_digits[i];
  }, 0);

  return (11 - total % 11).toString().replace(/10/, 'k').replace(/11/, '0');
}


/**
 * Charlatan.Code.isbn(base=10) -> String
 *  - base(Number): isbn code type
 *
 * Generate ISBN.
 *
 * By default generates 10 sign isbn code in format 123456789-X
 * You can pass 13 to generate new 13 sign code.
 **/
exports.isbn = function (base) {
  return Number(base) === 13 ? generate_base13_isbn() : generate_base10_isbn();
};


/**
 * Charlatan.Code.ean(base=13) -> String
 *  - base(Number): ean code type
 *
 * Generate EAN.
 *
 * By default generates 13 sign ean code in format 1234567890123
 * You can pass 8 to generate ean8 code
 **/
exports.ean = function (base) {
  return Number(base) === 8 ? generate_base8_ean() : generate_base13_ean();
};


/**
 * Charlatan.Code.rut() -> String
 *
 * Generate RUT.
 **/
exports.rut = function () {
  var value = String(Charlatan.Number.number(8));

  return value + '-' + String(rut_verificator_digit(value));
};
