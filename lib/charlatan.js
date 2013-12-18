"use strict";

/**
 * class Charlatan
 **/

exports.Name        = require('./charlatan/name');
exports.Address     = require('./charlatan/address');
exports.PhoneNumber = require('./charlatan/phone_number');
exports.Internet    = require('./charlatan/internet');
exports.Company     = require('./charlatan/company');
exports.Lorem       = require('./charlatan/lorem');
var Helpers         = exports.Helpers = require('./charlatan/helpers');
var Data            = require('./charlatan/data');

// getValue(data, path) -> mixed
// - data (object): locale
// - path (array): path to property
//
// get value from locale hash
function getValue(data, path) {
  if (!data[path[0]] ||
      (path.length > 0 && typeof(data[path[0]]) !== 'object')) {
    return undefined;
  }
  if (path.length === 1) {
    return data[path[0]];
  }
  return getValue(data[path[0]], path.slice(1));
}

// snake2camelcase(str) -> string
// - str (string): source string
//
// locale files use snake notation `xxx_yyy_zzz`
// but real methods use camelcase `xxxYyyZzz`
function snake2camelcase(str) {
  return str.replace(/(\_[a-z])/g,
    function ($1) { return $1.toUpperCase().replace('_',''); }
  );
}


/**
 * Charlatan.addLocale(name, data) -> void
 * - name (string): locale name, for example `en-us`
 * - data (object|string): locale hash or file name
 *
 * Load locale to Charlatan. Charlatan preload some
 * [locales](https://github.com/nodeca/charlatan/tree/master/lib)
 **/
var addLocale = exports.addLocale = Data.addLocale;


/**
 * Charlatan.setLocale(name) -> void
 * - name (string): locale name, for example `en-us`
 **/
exports.setLocale = Data.setLocale;


/**
 * Charlatan.translate(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Returns a phrase from the locale.
 *
 * Fallbacks to base language (and then to `en`)
 *   if it was not found: `ru_RU -> ru -> en`
 **/
exports.translate = Data.translate;


/**
 * Charlatan.fetch(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Helper for the common approach of grabbing a translation
 * with an array of values and selecting one of them.
 **/
var fetch = exports.fetch = Data.fetch;


/**
 * Charlatan.parse(key) -> string
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Load formatted strings from the locale, "parsing" them
 * into method calls that can be used to generate a
 * formatted translation: e.g., "#{first_name} #{last_name}".
 **/
exports.parse = Data.parse;


/**
 * Charlatan.numerify(source) -> string
 * - source (string): source string
 *
 * Find `#` symbol and replace it with random number
 **/
exports.numerify = function (source) {
  return source.replace(/\#/g, function () {
    return Math.floor(Math.random() * 10);
  });
};


/**
 * Charlatan.letterify(source) -> string
 * - source (string): source string
 *
 * Find `?` symbol and replace it with random char from [A..Z]
 **/
exports.letterify = function (source) {
  return source.replace(/\?/g, function () {
    return Helpers.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
  });
};
