'use strict';

/**
 * Charlatan
 *
 **/

exports.Name = require('./name');
exports.Address = require('./address');
exports.PhoneNumber = require('./phone_number');
exports.Internet = require('./internet');
exports.Company = require('./company');
exports.Lorem = require('./lorem');
exports.Helpers =  require('./helpers');
exports.definitions = require('./definitions');

var YAML = require('js-yaml');

var locales = {};
var current_locale;
var base_locale = 'en';
var default_locale = 'en';

var sample = function(source) {
  return exports.Helpers.sample(source);
};


/**
 * Charlatan#addLocale(name, data) -> void
 * - name (string): locale name, for example `en-us`
 * - data (object|string): locale hash or yaml file
 *
 * Load locale to Charlatan. Charlatan preload some
 * [locales](https://github.com/shkuropat/Charlatan/tree/master/lib)
 **/
var addLocale = exports.addLocale = function (name, data) {
  // data in file
  if (typeof name === 'string') {
    data = require(data)[name];
  }
  locales[name] = data;
};


/**
 * Charlatan#setLocale(name) -> void
 * - name (string): locale name, for example `en-us`
 *
 *
 **/
exports.setLocale = function (name) {
  current_locale = name;
};


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

/**
 * Charlatan#translate(key) -> mixed
 * - key (string) -> key in locale, for example `address.city_prefix`
 *
 * Returns a phrase from the locale.
 * Fallbacks to base language (and then to `en`)
 *  if it was not found: `ru_RU -> ru -> en`
 * **/
exports.translate = function(key) {
  var lang = current_locale.split('-')[0];
  var path = key.split('.');
  var result = getValue(locales[current_locale], path);

  // fallback to lang
  if (result === undefined && lang !== current_locale) {
    result = getValue(locales[lang], path);
  }

  // fallback to base_lang
  if (result === undefined) {
    result = getValue(locales[base_locale], path);
  }
  // raise err
  if (result === undefined) {
    throw new Error('Invalid path:' + key);
  }

  return result;
};


/**
 * Charlatan#fetch(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Helper for the common approach of grabbing a translation
 * with an array of values and selecting one of them.
 **/
exports.fetch = function(key) {
  var fetched = exports.translate(key);
  if (fetched.length !== undefined) {
    fetched = sample(fetched);
  }
  // need regexfy from ruby version?
  return fetched;
};


// Init charlatan
var locales_dir = require('path').resolve(__dirname, '../config/locales') + '/';
require('fs').readdirSync(locales_dir).forEach(function (file) {
  if (/\.yml/.test(file)) {
    addLocale(file.replace('.yml', ''), locales_dir + file);
  }
});
exports.setLocale('en');

