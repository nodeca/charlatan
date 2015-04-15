'use strict';

/**
 * class Charlatan.Company
 **/

var Helpers = require('./helpers');
var Charlatan = require('../charlatan');


/**
 * Charlatan.Company.name() -> String
 *
 * Generate company name
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
 * Generate a buzzword-laden catch phrase.
 **/
exports.catchPhrase = function () {
  return Charlatan.translate('company.buzzwords').map(function (list) {
    return Helpers.sample(list);
  }).join(' ');
};


/**
 * Charlatan.Company.bs() -> String
 *
 * When a straight answer won't do, BS to the rescue!
 **/
exports.bs = function () {
  return Charlatan.translate('company.bs').map(function (list) {
    return Helpers.sample(list);
  }).join(' ');
};


/**
 * Charlatan.Company.ein() -> String
 *
 * Generate ein
 **/
exports.ein = function () {
  return Math.random().toFixed(2).slice(2) + '-' +
         Math.random().toFixed(7).slice(2);
};


/**
 * Charlatan.Company.dunsNumber() -> String
 *
 * Generate duns
 **/
exports.dunsNumber = function () {
  return Math.random().toFixed(2).slice(2) + '-' +
         Math.random().toFixed(3).slice(2) + '-' +
         Math.random().toFixed(4).slice(2);
};


/**
 * Charlatan.Company.logo () -> String
 *
 * Get a random company logo url in PNG format.
 **/
exports.logo = function () {
  var rand_num = Charlatan.Helpers.rand(13) + 1;
  return 'http://pigment.github.io/fake-logos/logos/medium/color/' + rand_num + '.png';
};
