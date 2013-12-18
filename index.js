"use strict";

/**
 * Charlatan entry point for Node.js.
 */

var Charlatan = require('./lib/charlatan');
var Data = require('./lib/charlatan/data');

exports.Name        = Charlatan.Name;
exports.Address     = Charlatan.Address;
exports.PhoneNumber = Charlatan.PhoneNumber;
exports.Internet    = Charlatan.Internet;
exports.Company     = Charlatan.Company;
exports.Lorem       = Charlatan.Lorem;
exports.Helpers     = Charlatan.Helpers;

var Fs = require('fs');
var Path = require('path');

var availableLocales = {};

/**
 * Charlatan.addLocale(name, data) -> void
 * - name (string): locale name, for example `en-us`
 * - data (object|string): locale hash or file name
 *
 * Load locale to Charlatan. Charlatan preload some
 * [locales](https://github.com/nodeca/charlatan/tree/master/lib)
 **/
var addLocale = exports.addLocale = function(name, data) {
  var i;
  // if data not set, then check avaliable
  if (data === undefined) {
    if (!availableLocales[name]) {
      throw new Error('Locale not found:' + name);
    }

    data = availableLocales[name];

    // load base language, if exists
    var lang = name.split('-')[0];
    if (name !== lang && !!availableLocales[lang]) {
      addLocale(lang);
    }
  }
  // data in file
  if (typeof data === 'string') {
    if (!Fs.existsSync(data)) {
      throw new Error('Config ' + data + ' not found');
    }
    data = require(data);
  }

  // NOTE: Ruby faker library uses `faker` level, so use it if it's there.
  if (data[name].faker) {
    data[name] = data[name].faker;
  }

  return Data.addLocale(name, data[name]);
};


/**
 * Charlatan.setLocale(name) -> void
 * - name (string): locale name, for example `en-us`
 **/
exports.setLocale = function(name) {
  if (!Data.hasLocale(name)) {
    addLocale(name);
  }
  return Data.setLocale(name);
};


/**
 * Charlatan.translate(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Returns a phrase from the locale.
 *
 * Fallbacks to base language (and then to `en`)
 *   if it was not found: `ru_RU -> ru -> en`
 **/
exports.translate = Charlatan.translate;


/**
 * Charlatan.fetch(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Helper for the common approach of grabbing a translation
 * with an array of values and selecting one of them.
 **/
var fetch = exports.fetch = Charlatan.fetch;


/**
 * Charlatan.parse(key) -> string
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Load formatted strings from the locale, "parsing" them
 * into method calls that can be used to generate a
 * formatted translation: e.g., "#{first_name} #{last_name}".
 **/
exports.parse = Charlatan.parse;


/**
 * Charlatan.numerify(source) -> string
 * - source (string): source string
 *
 * Find `#` symbol and replace it with random number
 **/
exports.numerify = Charlatan.numerify;


/**
 * Charlatan.letterify(source) -> string
 * - source (string): source string
 *
 * Find `?` symbol and replace it with random char from [A..Z]
 **/
exports.letterify = Charlatan.letterify;


// Init Charlatan
// fetch locales and init base locale
var locales_dir = Path.resolve(__dirname, 'lib/locales');

Fs.readdirSync(locales_dir).forEach(function(file) {
  if (/\.json/.test(file)) {
    availableLocales[file.replace('.json', '')] = Path.join(locales_dir, file);
  }
});

exports.setLocale(Data.baseLocale());
