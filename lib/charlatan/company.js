'use strict';

/**
 * class Charlatan.Company
 **/

var Helpers = require('./helpers');
var Charlatan = require('../charlatan');


/**
 * Charlatan.Company.name() -> String
 *
 * Genreate company name
 *
 **/
exports.name = function () {
  return Charlatan.parse('company.name');
};


/**
 * Charlatan.Company.suffix() -> String
 *
 * Return random suffix, for example "Inc"
 *
 **/
exports.suffix = function () {
  return Charlatan.fetch('company.suffix');
};

/**
 * Charlatan.Company.catchPhrase() -> String
 *
 * Generate catch phrase
 **/
exports.catchPhrase = function () {
  return Charlatan.translate('company.buzzwords').map(function (list) {
    return Helpers.sample(list);
  }).join(' ');
};


/**
 * Charlatan.Company.bs() -> String
 *
 * Generate bullshet
 **/
exports.bs = function () {
  return Charlatan.translate('company.bs').map(function (list) {
    return Helpers.sample(list);
  }).join(' ');
};

/**
 * Charlatan.Company.dunsNumber() -> String
 *
 * Generate duns 
 **/
exports.dunsNumber = function () {
  var numbers = new Array(9);
  for (var i = 0; i < numbers.length; i++) {
    numbers[i] =  Charlatan.Helpers.rand(9).toString();
  }
  return numbers.slice(0, 2).join('') + '-' +
    numbers.slice(2, 5).join('') + '-' +
    numbers.slice(5, 9).join('');
};


/**
 * Charlatan.Company.logo () -> String
 *
 * Generate company logo in gif format
 **/
exports.logo = function () {
  var rand_num = Charlatan.Helpers.rand(76) + 1
  var rand_name = (rand_num < 10 ? "00" : "0") + rand_num;
  return "http://www.biz-logo.com/examples/" + rand_name + ".gif"
};
