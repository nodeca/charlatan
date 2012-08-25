'use strict';

/**
 * Company
 **/

var Helpers = require('./helpers');
var Charlatan = require('./charlatan');


/**
 * Company#name() -> String
 *
 * Genreate company name
 *
 **/
exports.name = function ( format ) {
  return Charlatan.parse('company.name');
};


/**
 * Company#suffix() -> String
 *
 * Return random suffix, for example "Inc"
 *
 **/
exports.suffix = function() {
  return Charlatan.fetch('company.suffix');
};

/**
 * Company#catchPhrase() -> String
 *
 * Generate catch phrase
 **/
exports.catchPhrase = function() {
  return Charlatan.translate('company.buzzwords').map(function(list){
    return Charlatan.Helpers.sample(list);
  }).join(' ');
};


/**
 * Company#bs() -> String
 *
 * Generate bullshet
 **/
exports.bs = function() {
  return Charlatan.translate('company.bs').map(function(list){
    return Charlatan.Helpers.sample(list);
  }).join(' ');
};
