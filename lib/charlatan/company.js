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
